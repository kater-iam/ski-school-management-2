"use client";

import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronDown, FileText, MoreHorizontal, Trash2, Plus } from "lucide-react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";
import { useDelete, useResource, useNavigation, HttpError } from "@refinedev/core";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Category {
    id: number;
    name: string;
    futon: string;
    created_at: string;
}

// オブジェクトのすべてのキーを取得（ネストされたものも含む）
const getAllKeys = (obj: any, prefix = ''): string[] => {
    return Object.entries(obj).reduce((keys: string[], [key, value]) => {
        // idフィールドは除外
        if (key === 'id' || key.endsWith('_id')) return keys;

        const newKey = prefix ? `${prefix}.${key}` : key;
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            return [...keys, ...getAllKeys(value, newKey)];
        }
        return [...keys, newKey];
    }, []);
};

// キーをキャメルケースから人間が読みやすい形式に変換
const formatColumnName = (key: string) => {
    return key
        .split('.')
        .map(part =>
            part
                .replace(/_/g, ' ')
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => str.toUpperCase())
        )
        .join(' - ');
};

// ネストされたオブジェクトから値を取得
const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((current, key) =>
        current && typeof current === 'object' ? current[key] : undefined
        , obj);
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
};

// セルの値をフォーマット
const formatCellValue = (value: any) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';

    const stringValue = String(value);
    if (typeof value === 'string' && (
        stringValue.match(/^\d{4}-\d{2}-\d{2}/) ||
        stringValue.includes('T')
    )) {
        try {
            return formatDate(stringValue);
        } catch (e) {
            return stringValue;
        }
    }
    return stringValue;
};

interface ListProps {
    data: any[];
    isLoading: boolean;
    error?: Error | HttpError | null;
}

const ActionCell = ({ row, router, resource, handleDelete }: {
    row: any;
    router: any;
    resource: any;
    handleDelete: (id: number) => void;
}) => {
    const dialogRef = React.useRef<HTMLDialogElement>(null);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    
    const handleDeleteClick = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
            setIsDropdownOpen(false);
        }
    };

    const handleConfirmDelete = () => {
        handleDelete(row.original.id);
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };

    const handleCancelDelete = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };
    
    return (
        <>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onClick={() => {
                            router.push(`${resource?.name}/show/${row.original.id}`);
                            setIsDropdownOpen(false);
                        }}
                    >
                        <FileText className="mr-2 h-4 w-4" />
                        詳細を表示
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="text-destructive"
                        onSelect={(e) => {
                            e.preventDefault();
                            handleDeleteClick();
                        }}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        削除
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <dialog
                ref={dialogRef}
                className="rounded-lg p-0 backdrop:bg-black/30"
                onClick={(e) => {
                    const dialogDimensions = dialogRef.current?.getBoundingClientRect();
                    if (dialogDimensions) {
                        const clickedInDialog = (
                            e.clientX >= dialogDimensions.left &&
                            e.clientX <= dialogDimensions.right &&
                            e.clientY >= dialogDimensions.top &&
                            e.clientY <= dialogDimensions.bottom
                        );
                        if (!clickedInDialog) {
                            dialogRef.current?.close();
                        }
                    }
                }}
            >
                <div className="min-w-[400px]">
                    <div className="border-b p-4">
                        <h2 className="text-lg font-semibold">削除の確認</h2>
                        <p className="text-sm text-muted-foreground">
                            本当にこの項目を削除しますか？この操作は取り消せません。
                        </p>
                    </div>
                    <div className="flex justify-end gap-2 p-4">
                        <Button
                            variant="outline"
                            onClick={handleCancelDelete}
                        >
                            キャンセル
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleConfirmDelete}
                        >
                            削除
                        </Button>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export const List: React.FC<ListProps> = ({ data: items, isLoading, error }) => {
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const router = useRouter();
    const { mutate } = useDelete();
    const { resource } = useResource();
    const { create } = useNavigation();

    const handleDelete = (id: number) => {
        mutate(
            {
                resource: resource?.name ?? "",
                id,
            },
            {
                onSuccess: () => {
                    toast.success("削除しました");
                },
                onError: (error) => {
                    toast.error("削除に失敗しました");
                }
            }
        );
    };

    // カラムの準備
    const columns = React.useMemo(() => {
        if (items.length === 0) return [];
        const keys = getAllKeys(items[0]);
        return [
            ...keys.map(key => ({
                id: key,
                accessorFn: (row: any) => getNestedValue(row, key),
                header: formatColumnName(key),
                cell: ({ getValue }: any) => formatCellValue(getValue()),
            })),
            {
                id: "actions",
                header: "",
                cell: ({ row }: any) => (
                    <ActionCell
                        row={row}
                        router={router}
                        resource={resource}
                        handleDelete={handleDelete}
                    />
                ),
            },
        ];
    }, [items, router, resource, handleDelete]);

    // テーブルインスタンスを作成
    const table = useReactTable({
        data: items,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            columnVisibility,
        },
    });

    // ページネーションアイテムを生成
    const generatePaginationItems = () => {
        const currentPage = table.getState().pagination.pageIndex + 1;
        const totalPages = table.getPageCount();
        const items = [];

        for (let i = 1; i <= totalPages; i++) {
            items.push(
                <PaginationItem key={`page-${i}`}>
                    <Button
                        variant={currentPage === i ? "default" : "outline"}
                        onClick={() => table.setPageIndex(i - 1)}
                    >
                        {i}
                    </Button>
                </PaginationItem>
            );
        }

        return items;
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div style={{ color: "red" }}>{error.message}</div>;
    if (items.length === 0) return <div>No data</div>;

    return (
        <div className="w-full">
            <div className="flex items-center justify-end pb-4">
                <Button
                    onClick={() => create(resource?.name ?? "")}
                    className="flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" />
                    新規作成
                </Button>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    データがありません。
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end py-4">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    table.previousPage();
                                }}
                                aria-disabled={!table.getCanPreviousPage()}
                                className={
                                    !table.getCanPreviousPage()
                                        ? "pointer-events-none opacity-50"
                                        : ""
                                }
                            />
                        </PaginationItem>
                        {generatePaginationItems()}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    table.nextPage();
                                }}
                                aria-disabled={!table.getCanNextPage()}
                                className={
                                    !table.getCanNextPage()
                                        ? "pointer-events-none opacity-50"
                                        : ""
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};
