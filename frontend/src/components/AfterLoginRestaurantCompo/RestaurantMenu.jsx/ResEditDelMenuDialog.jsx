import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { forwardRef, useState } from "react";
import DeleteDialog from "./ResDeleteDialog";
import ResEditMenuForm from "./ResEditMenuForm";

const ResEditDelMenuDialog = forwardRef((props, dialogRef) => {
    const [delDialog, setDelDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);

    return (
        <>
            <div className="absolute right-0 mt-8 mr-4 py-2 w-48 h-[99px] bg-white border border-gray-200 rounded-md shadow-lg" ref={dialogRef}>

                <ul className="  font-poppins">
                    <li className='w-full hover:bg-gray-100'
                        onClick={() => { setEditDialog(true) }}
                    >
                        <button className='flex items-center p-2 gap-x-4' >
                            <span className='ml-3'><FiEdit /></span>
                            <span>Edit item</span>
                        </button>
                    </li>
                    <li className='w-full hover:bg-gray-100'
                        onClick={() => { setDelDialog(true) }}>
                        <button className='flex items-center p-2 gap-x-4' >
                            <span className='ml-3'><AiOutlineDelete size={18} /></span>
                            <span>Delete item</span>
                        </button>

                    </li>
                </ul>
                <DeleteDialog delId={props.id} show={delDialog} handleClose={() => {
                    setDelDialog(false);
                }} />
                <ResEditMenuForm editId={props.id} show={editDialog} handleClose={() => {
                    setEditDialog(false);
                }} />
            </div>
        </>
    )
})

ResEditDelMenuDialog.displayName = 'ResEditDelMenuDialog'
export default ResEditDelMenuDialog