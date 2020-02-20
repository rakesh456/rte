import React from 'react';
//import ListItems from './list-items';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './rich-text-editor.css';

class FxEditor extends React.PureComponent{

    constructor(props){
        super(props);
    
    }
    state = {
        listval: "",
        filter: "",
        data: [
          {
              id:"1",
            name: "Jayne"
          },
          {
              id:"2",
            name: "Peterson"
          },
          {
            id:"3",
            name: "Velazquez"
          },
          {
            id:"4",
            name: "Norman",
          }
        ]
      };

    handleChange = event => {
        this.setState({ filter: event.target.value });
    };

    click(val)
    {
        console.log(val)
        this.setState({listval:val})
    
    }
        render()
        {
            const { filter, data, listval } = this.state;
            const lowercasedFilter = filter.toLowerCase();
            const filteredData = data.filter(item => {
            return Object.keys(item).some(key =>
            item[key].toLowerCase().includes(lowercasedFilter)
        );
        });
            
            return (
                <div className="row">
                    <div className="column1">
                    <h5>Message:</h5>
                    <CKEditor
                        editor={ ClassicEditor }
                        data={this.state.listval}
                       
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    />
                    </div>
                    <div className="column2">
                    <div className="list">
                        <input value={filter} onChange={this.handleChange} placeholder="Search.."/>
                        {filteredData.map(item => (
                        
                            <li key={item.id} onClick={ ()=> this.click(item.name) }> {item.name}  </li>
                        
                        ))}
                    </div>
                    </div>
                </div>
            );
        }
}

export default FxEditor;