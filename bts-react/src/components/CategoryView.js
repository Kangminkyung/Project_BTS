import React from 'react';
import PropTypes from 'prop-types'
import { Button, Select } from '@material-ui/core';
import * as env from '../utils/environment'


const CategoryView = ({keyword, categoryChange}) => {
    const handleChange = (e) => {
        categoryChange(e.target.value);
    }
    return (
        <div style={{display: "flex", justifyContent: "flex-end", margin: "auto"}}>
            <Select native value={keyword} onChange={handleChange}> 
                <option value="전체">전체</option>
                    {env.CATEGORY.map((category, index) =>
                        <option value={category} key={index}>{category}</option>
                    )}
            </Select>
        </div>
    );
}

CategoryView.propTypes = {
    categoryChange: PropTypes.func
}
CategoryView.defaultProps = {
    categoryChange: () => {console.log("categoryChange not defined");}
}

export default CategoryView;