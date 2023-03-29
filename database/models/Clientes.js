module.exports = (sequelize, DataTypes) => {
    const Clientes = sequelize.define('Clientes', {
        nome: {
            type:DataTypes.STRING(120),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        senha: {
            type: DataTypes.STRING(64),
            allowNull: false
        }
    }, {
        tableName: 'clientes',
        paranoid: true
    })
        return Clientes
}
