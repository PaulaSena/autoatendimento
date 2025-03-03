import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ProductPage = () => {
    return(
    <div className="p-5 rounded-xl border bg-purple-500">
        <h1> Pagina de Produtos</h1>
        <Button className="m-2">Buy Now</Button>
        <Input className="m-2" placeholder="Bora nessa"/>
    </div> );    
};
 
export default ProductPage;