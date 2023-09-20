import { Button, Input, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { useContext, useState } from "react";
import { AiOutlineDown } from "react-icons/ai"
import ItemCategoryContext from "../../../Contexts/Inventory/CategoryContext";
import { Category } from "../../../services/Inventory/category-page-service";

interface Props {
    selectedCategory:(category:Category)=>void
}

const FilterCategory = ({selectedCategory}:Props) => {
     
  const { categories, setCategories, setCategoryNameFilter } = useContext(ItemCategoryContext);
  const [cat, setCat] = useState<Category | null>(null)

  const onCategoryType = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let currentValue = event.currentTarget.value;   
    setCategoryNameFilter(currentValue) 
  };

  return (
    <div>
        <Menu>
              <MenuButton as={Button} rightIcon={<AiOutlineDown />} width='100%'>
                {cat === null? "Select Category":cat?.category_name}
              </MenuButton>
              <MenuList>
                <Input    onKeyUp={onCategoryType} placeholder="Search"/>
                {categories
                  .map((category) => (
                      <MenuItem onClick={()=> {
                        selectedCategory(category)
                        setCat(category)
                        }} className="dropdown-item">
                        {category.category_name}
                      </MenuItem>                   
                  ))}
                
              </MenuList>
            </Menu>
    </div>
  )
}

export default FilterCategory