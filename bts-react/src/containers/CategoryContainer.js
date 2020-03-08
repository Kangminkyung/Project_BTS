import * as actions from '../actions';
import { connect } from 'react-redux';
import CategoryView from '../components/CategoryView';

const mapStateToProps = (state) => { // 리덕스가 관리하는 상태를 지켜봄, 
    return {
        keyword: state.category.keyword
    }
};

const mapDispatchToProps = (dispatch) => ({ // 상태를 변경시켜야할 때 액션 생성자를 실행
    categoryChange: (keyword) => {dispatch(actions.categoryChange(keyword))},
});

const CategoryContainer = connect(mapStateToProps, mapDispatchToProps)(CategoryView);

export default CategoryContainer;