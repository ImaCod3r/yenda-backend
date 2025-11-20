export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        photo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        shareable: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        store_id: {
            type: Sequelize.BIGINT,
            allowNull: true,
            references: {
                model: 'stores',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        category_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'product_categories',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    });

    // Add indexes for foreign keys and common queries
    await queryInterface.addIndex('products', ['store_id']);
    await queryInterface.addIndex('products', ['category_id']);
    await queryInterface.addIndex('products', ['shareable']);
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
}
