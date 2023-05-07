const Produtos = require('./Produtos')

module.exports = (sequelize, DataTypes) => {
    const Imagens = sequelize.define('Imagens', {
        imagens_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
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
            foreignKey: 'produtos_id',
            as: 'produto'
        })
    }

        return Imagens
}
