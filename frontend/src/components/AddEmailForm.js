import { Dialog, DialogBody, DialogHeader, DialogFooter, Button } from "@material-tailwind/react";

const AddEmailForm = ({ open, handleOpen, handleAdd, email, setEmail, description, setDescription, addPending }) => {
    return (
        <Dialog open={ open } handler={ handleOpen }>
            <DialogHeader>Add a New Recipient!</DialogHeader>
            <DialogBody>
                <form className="bg-white px-8 pt-6 pb-8 mb-4" onSubmit={ handleAdd }>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email <span className="text-red-400">*</span>
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            required
                            value={ email }
                            onChange={ (e) => setEmail(e.target.value) }
                            placeholder="example@email.com" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Description
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="description"
                            type="text"
                            value={ description }
                            onChange={ (e) => setDescription(e.target.value) }
                            placeholder="Description" />
                    </div>

                    <div className="flex items-center justify-center mx-4">
                        { !addPending && <Button className="flex items-center gap-6 px-6 py-3 mt-4 text-sm" size="sm" type='submit'>
                            Add Recipient
                        </Button> }
                        { addPending && <Button className="flex items-center gap-6 px-6 py-3 mt-4 text-sm" disabled size="sm" type='submit'>
                            Add Recipient
                        </Button> }
                    </div>
                </form>
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={ handleOpen }
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default AddEmailForm;