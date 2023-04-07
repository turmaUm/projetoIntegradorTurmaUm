const Produtos = require('./Produtos')

module.exports = (sequelize, DataTypes) => {
    const Imagens = sequelize.define('Imagens', {
        produtos_id: {
            type: DataTypes.INTEGER,
            allowNull: false    
        },
        caminho: {
            type: DataTypes.STRING(256),
            allowNull: false
        }
    }, {
        tableName: 'imagens',
        timestamps: false
    })

    Imagens.associate = models => {
        Imagens.belongsTo(models.Produtos, {
            foreign_key: 'produtos_id',
            as: 'produto'
        })
    }

        return Imagens
}
