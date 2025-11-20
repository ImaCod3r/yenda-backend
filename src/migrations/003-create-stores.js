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
            type: Sequelize.TEXT,
            allowNull: false,
        },
        nif: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        photo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        latitude: {
            type: Sequelize.DECIMAL,
            allowNull: true,
        },
        longitude: {
            type: Sequelize.DECIMAL,
            allowNull: true,
        },
        isVerified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        whatsapp: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        number: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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
