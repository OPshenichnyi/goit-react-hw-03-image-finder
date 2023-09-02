import { Formik } from 'formik';
import { CssSearchbar } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {

    return (
        <CssSearchbar className="searchbar">
            <Formik
                initialValues={{ name: '' }}
                
                onSubmit={(values, actions) => {
                    onSubmit(values);

                    setTimeout(() => {
                        actions.resetForm()
                    }, 500);

                }}
            >
                {props =>(
                    <form onSubmit={props.handleSubmit} className="form">
                        <button type="submit" className="button">
                            <span className="button-label">Search</span>
                        </button>
                        <input
                            className="input"
                            type="text"
                            autoComplete="off"
                            autoFocus
                            placeholder="Search images and photos"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.name}
                            name="name"
                        />
                        {props.errors.name && <div id="feedback">{props.errors.name}</div>}

                    </form>
                )}
            </Formik>
        </CssSearchbar> 
    )
}

