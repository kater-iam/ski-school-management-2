describe('ダッシュボード', () => {
  beforeEach(() => {
    // テスト前にログイン画面にアクセス
    cy.visit('/login');
  });

  it('ログインしてダッシュボードを表示できる', () => {
    // ログイン情報を入力
    cy.get('input[id="email"]').clear().type('admin@kater.jp');
    cy.get('input[id="password"]').clear().type('password123');
    cy.get('button[type="submit"]').click();

    // ダッシュボードが表示されることを確認
    cy.get('h2').contains('スキースクール管理システム').should('be.visible');
    cy.get('button').contains('レッスン予約').should('be.visible');

    // レッスン一覧のテーブルが表示されることを確認
    cy.get('.ant-table-thead').should('be.visible');
    cy.get('.ant-table-thead').contains('時間').should('be.visible');
    cy.get('.ant-table-thead').contains('レッスン').should('be.visible');
    cy.get('.ant-table-thead').contains('参加人数').should('be.visible');
    cy.get('.ant-table-thead').contains('インストラクター').should('be.visible');
    cy.get('.ant-table-thead').contains('状態').should('be.visible');

    // 日付ナビゲーションが表示されることを確認
    cy.contains('button', '前の日').should('be.visible');
    cy.contains('button', '次の日').should('be.visible');
  });

  it('日付ナビゲーションが機能する', () => {
    // ログイン
    cy.get('input[id="email"]').clear().type('admin@kater.jp');
    cy.get('input[id="password"]').clear().type('password123');
    cy.get('button[type="submit"]').click();

    // 現在の日付を取得
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateString = `${year}年${month}月${day}日`;

    // 現在の日付が表示されていることを確認
    cy.contains(dateString).should('be.visible');

    // 前の日ボタンをクリックして日付が変更されることを確認
    cy.contains('button', '前の日').click();
    cy.contains(dateString).should('not.exist');

    // 次の日ボタンをクリックして元の日付に戻ることを確認
    cy.contains('button', '次の日').click();
    cy.contains(dateString).should('be.visible');
  });
}); 