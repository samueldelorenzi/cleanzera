/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('tests', {
    id: 'id',
    athlete_id: {
      type: 'integer',
      notNull: true,
      references: '"athletes"',
      onDelete: 'CASCADE',
    },
    test_date: { type: 'date', notNull: true },
    test_type: { type: 'text', notNull: true },
    result: { type: 'text', notNull: true },
    laboratory: { type: 'text', notNull: true },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('tests');
};
