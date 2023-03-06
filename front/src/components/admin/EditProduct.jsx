import { useParams } from "react-router-dom"
import axios from "axios"
import { BASE_URL, BASE_IMG } from "../../tools/constante.js"
import { useState, useEffect, Fragment } from "react"

const EditProduct = () => {

    const { productId } = useParams()
    const [product, setProduct] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        axios
            .post(`${BASE_URL}/admin/getProductId`, { id: productId })
            .then((res) => {
                console.log(res);
                const data = res.data.result[0];
                setProduct(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });

    }, [productId])

    const handleChange = (e) => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }


    const submit = (e) => {
        e.preventDefault()

        axios.post(`${BASE_URL}/admin/updateProductId`, {
                id: product.id,
                type_id: product.type_id,
                name: product.name,
                price: product.price,
                category_id: product.category_id
            })
            .catch(err => console.log(err))
            .then(res => {
                console.log(product)
                console.log(res)
            })
    }

    const handlePicture = (e) => {

        const dataFile = new FormData()
        const files = { ...e.target.picture.files }

        console.log(dataFile)
        console.log(files)

        
        dataFile.append('files', files[0], files[0].name)
        dataFile.append('products_id', productId)
        dataFile.append('url', product.url)

        axios.post(`${BASE_URL}/admin/updateProductPicture`, dataFile)
            .then(res => {
                console.log(res)
                // Rafraîchir la page pour afficher la nouvelle image
                window.location.reload()
            })
            .catch(err => console.log(err))

    }

    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <Fragment>
                <img src={`${BASE_IMG}/${product.url}`} alt="product image"/>
            <form onSubmit={submit}>
                <label>
                    Type de produit :
                    <select name="type_id" 
                    onChange ={handleChange} 
                    value={product.type_id}>{/* pour la modification du type*/}
                        <option value="1">Consoles</option>
                        <option value="2">Jeux</option>
                    </select>
                </label>
                <label>
                    Nom : 
                    <input type="text" 
                        name="name" 
                        onChange={handleChange} 
                        value={product.name}/>
                </label>
                <label>
                    Prix :
                    <input type="number" 
                        name="price" 
                        onChange ={handleChange} 
                        value={product.price}/>
                </label>
                <label>
                    Categorie :
                    <select name="category_id" 
                    onChange ={handleChange} 
                    value={product.category_id}>
                    <option value="">Choisir une catégorie</option>
                        <option value="1">Playstation</option>
                        <option value="2">Nintendo</option>
                        <option value="3">SEGA</option>
                        <option value="4">Commodore 64</option>
                    </select>
                </label>
                
                <button type='submit'>modifier le Produit</button>
                
            </form>
            <form onSubmit={handlePicture}  encType="multipart/form-data">
                <label htmlFor='picture'>
                      Enregistrer l'image
                      <input type='file' id='picture' name='picture' />
                </label>
                <button type="submit">envoyer la photo </button>
            </form>
        </Fragment>
    )
}

export default EditProduct
