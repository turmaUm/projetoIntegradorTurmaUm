module.exports = (sequelize, DataTypes) => {
    const Adms = sequelize.define('Administradores', {
        nome: {
            type: DataTypes.STRING(120),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true
        },
        senha: {
            type: DataTypes.STRING(64),
            allowNull: false
        }
    }, {
        tableName: 'administradores',
        timestamps: false
    })
        return Adms
}
