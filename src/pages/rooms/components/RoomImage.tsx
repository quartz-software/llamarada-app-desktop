// import { FC, useState } from "react";
// import Button from "../../../shared/components/Button";

// import "./RoomImage.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faImage } from "@fortawesome/free-solid-svg-icons";

// type ImageRoom = {
//   model: RoomImage;
//   onChange: (file: File) => void;
//   onDelete: () => void;
// };

// const RoomImage: FC<ImageRoom> = ({ model, onChange, onDelete }) => {
//   const [image, setImage] = useState(model);
//   const [imgSrc, setImgSrc] = useState(
//     image.path ? `http://localhost:8080${image.path}` : ""
//   );

//   return (
//     <div className="div-image">
//       {/* <FormField label="Nombre" errorMessage="" >
//         <Input type="text"
//           value={image.name}
//           handleInput={(value: string) => { setImage({ ...image, name: value }) }}
//           resetMessage={() => { }} />
//       </FormField> */}
//       <FormField label="Tipo" errorMessage="">
//         <select
//           value={image.type}
//           onChange={(e) => {
//             setImage({ ...image, type: e.target.value });
//           }}
//         >
//           <option value="normal">Normal</option>
//           <option value="3d">3D</option>
//           <option value="panoramic">Panoramica</option>
//         </select>
//       </FormField>
//       <FormField label="Imagen" errorMessage="">
//         <>
//           <Input
//             type="file"
//             handleInput={(value: File) => {
//               onChange(value);
//               const filereader = new FileReader();
//               filereader.readAsDataURL(value);
//               filereader.addEventListener("load", (e) => {
//                 setImgSrc(e.target?.result ? e.target.result.toString() : "");
//               });
//               setImage({ ...image, file: value });
//             }}
//             value={""}
//             resetMessage={() => { }}
//           />
//           {imgSrc == "" ? (
//             <div className="div-image__divSI">
//               <FontAwesomeIcon icon={faImage} />
//               <span>Subir una Imagen</span>
//             </div>
//           ) : (
//             <img src={imgSrc} alt="" className="div-image__img" />
//           )}
//         </>
//       </FormField>
//       <Button
//         handleClick={() => {
//           onDelete();
//         }}
//       >
//         Eliminar
//       </Button>
//     </div>
//   );
// };

// export default RoomImage;
