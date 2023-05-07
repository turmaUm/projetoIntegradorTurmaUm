const Produtos = require('./Produtos')

module.exports = (sequelize, DataTypes) => {
    const Cores = sequelize.define('Cores', {
        nome: {
            type:DataTypes.STRING(45),
            allowNull: false
        }
    }, {
        tableName: 'cores',
        timestamps: false
    })

    Cores.associate = models => {
        Cores.belongsToMany(models.Produtos, {
            as: 'cores',
            through: 'produto_cor',
            foreignKey: 'cor_id',
            otherKey: 'produtos_id',
            timestamps: false
        })
    }

    return Cores
}