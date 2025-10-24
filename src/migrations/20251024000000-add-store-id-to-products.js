export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('products', 'store_id', {
    type: Sequelize.UUID,
    allowNull: true,
    references: {
      model: 'stores',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('products', 'store_id');
}