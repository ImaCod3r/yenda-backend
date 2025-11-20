export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        number: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        photo: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        role: {
            type: Sequelize.ENUM('user', 'admin'),
            defaultValue: 'user',
        },
        street: {
            type: Sequelize.STRING(500),
            allowNull: false,
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

    // Add index on email for faster lookups
    await queryInterface.addIndex('users', ['email']);
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
}
