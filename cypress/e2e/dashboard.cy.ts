describe('ダッシュボード', () => {
  beforeEach(() => {
    // APIレスポンスをモック
    cy.intercept('GET', '**/lesson_schedules*', { fixture: 'lesson_schedules.json' }).as('getLessonSchedules');
    
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

    // APIレスポンスを待機
    cy.wait('@getLessonSchedules');

    // 前の日のデータが存在することを確認
    cy.contains('button', '前の日').should('not.be.disabled');

    // 前の日ボタンをクリックして日付が変更されることを確認
    cy.contains('button', '前の日').click();
    cy.wait('@getLessonSchedules');
    cy.get('.ant-table-row').first().should('contain', '09時00分');
    cy.get('.ant-table-row').first().should('contain', '初級スキーレッスン');

    // 次の日ボタンが有効になることを確認
    cy.contains('button', '次の日').should('not.be.disabled');

    // 次の日ボタンをクリックして日付が変更されることを確認
    cy.contains('button', '次の日').click();
    cy.wait('@getLessonSchedules');
    cy.get('.ant-table-row').first().should('contain', '13時00分');
    cy.get('.ant-table-row').first().should('contain', '中級スキーレッスン');
  });
}); 