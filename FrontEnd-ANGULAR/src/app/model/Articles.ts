import { Category } from "./Category";
export class Articles {
    id ! :number;
    title ! :string;
    content ! :string;
    picture ! :string;
    slug! :string;
   /*  isPublished! :string;
    updatedAt! :string;*/
    category !: string;
}
