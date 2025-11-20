export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('stores', {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        category: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        nif: {
            type: Sequelize.STRING(50),
            allowNull: true,
        },
        photo: {
            type: Sequelize.STRING(500),
            allowNull: true,
        },
        latitude: {
            type: Sequelize.DECIMAL(10, 8),
            allowNull: true,
        },
        longitude: {
            type: Sequelize.DECIMAL(11, 8),
            allowNull: true,
        },
        isVerified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        email: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true,
        },
        address: {
            type: Sequelize.STRING(500),
            allowNull: true,
        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        whatsapp: {
            type: Sequelize.STRING(20),
            allowNull: true,
        },
        number: {
            type: Sequelize.STRING(20),
            allowNull: true,
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        },
    });

    // Add indexes for better query performance
    await queryInterface.addIndex('stores', ['email']);
    await queryInterface.addIndex('stores', ['name']);
    await queryInterface.addIndex('stores', ['isVerified']);
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('stores');
}
