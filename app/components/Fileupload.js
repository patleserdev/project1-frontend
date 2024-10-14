import styles from '../styles/Fileupload.module.css';
import React, { useState,useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload} from '@fortawesome/free-solid-svg-icons';
// import { useDispatch,useSelector } from 'react-redux';
// import { addFile } from '../reducers/file';
const FileUpload = () => {

  const [files, setFiles] = useState([]);
  // const dispatch = useDispatch();
  // const file = useSelector((state) => state.file.value);
  // useEffect(() => {
  //   if(!file)
  //   {
  //     setFiles([])
  //   }

  // }, [file]);

  // const [uploadedFiles, setUploadedFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      // setUploadedFiles(acceptedFiles);
      dispatch(addFile(acceptedFiles))
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            
          })
          
        )
      );
      
    },
  });

  const displayFiles=files.map((f,i) => <img key={i} className={styles.preview} src={f.preview} />)
//TO DO : Customize and Style this Drag and Drop to Upload box as you want🧑‍💻😊
  return (
    <div {...getRootProps()} className={styles.uploadBox} >
      <div className={styles.uploadInput}>
        <div>
      <label>Ajouter l'image de l'ingrédient</label>
      </div>
      <input {...getInputProps()}/>
      {displayFiles.length == 0 && <FontAwesomeIcon icon={faUpload} className={styles.icon}/>}
      {displayFiles}
      <div>
      <p>Déposer le fichier ou cliquez pour parcourir</p>
      </div>
      </div>
      <div>
      
      </div>
    </div>
  );
};
export default FileUpload;