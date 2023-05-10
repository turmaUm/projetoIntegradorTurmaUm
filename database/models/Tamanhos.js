const Produtos = require('./Produtos')

module.exports = (sequelize, DataTypes) => {
    const Tamanhos = sequelize.define('Tamanhos', {
        nome: {
            type:DataTypes.STRING(45),
            allowNull: false
        }
    }, {
        tableName: 'tamanhos',
        timestamps: false
    })

    Tamanhos.associate = models => {
        Tamanhos.belongsToMany(models.Produtos, {
            as: 'produto',
            through: 'produto_tamanho',
            foreignKey: 'tamanho_id',
            otherKey: 'produto_id',
            timestamps: false
        })
    }

    return Tamanhos
}