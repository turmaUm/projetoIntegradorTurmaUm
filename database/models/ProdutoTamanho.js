module.exports = (sequelize, DataTypes) => {
    const ProdutoTamanho = sequelize.define('ProdutoTamanho', {
        produto_id: {
            type:DataTypes.STRING(45),
            allowNull: false
        },
        tamanho_id: {
            type:DataTypes.STRING(45),
            allowNull: false
        }
    }, {
        tableName: 'produto_tamanho',
        timestamps: false
    })

    return ProdutoTamanho
}