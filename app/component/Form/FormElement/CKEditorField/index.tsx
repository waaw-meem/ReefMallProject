import React from 'react';
import style from './index.module.scss';
import { Controller } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// Import CKEditor 5 build
// import '@ckeditor/ckeditor5-build-classic/build/translations/en-gb'; // Example: Import the English language pack for CKEditor

// import 'ckeditor5/ckeditor5.css';

const CKeditorField = (props:any) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { value, onChange, ...prop } }) => (
        <div>
          {props.label && (
            <div className={`${style.label} ${style[props.customClass]}`}>
              {props.inputLabel}
            </div>
          )}
          <div
            className={`${style['input-container']}  ${
              style[props.class ? props.class : '']
            } input-container text-container`}
          >
            <div className={`${style['input-wrapper']} `}>
              <div
                className={`${style['input']} ${
                  style[props.class ? props.class : '']
                } ${style[props.customClass]} ${
                  props.bottomLabel ? style.bottomText : ''
                }`}
              >
                <CKEditor
                  {...prop}
                  editor={ClassicEditor}
                  ref={props.ref}
                  data={value} // Initial data value
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                    props.onChange && props.onChange(data);
                  }}
                  config={{
                    toolbar: {
                      items: ['undo', 'redo', '|', 'bold', 'italic'],
                    },
                    language: 'en-gb', // Language configuration
                    // licenseKey: '', // Replace with your license key if needed
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default CKeditorField;
