import React, { useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Tooltip } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";

const EditDeviceForm = ({ handleDelete, handleSubmit, open, handleOpen, name, type, ip, location, description, setName, setType, setIP, setLocation, setDescription, isPending }) => {
    return (
        <Dialog open={ open } handler={ handleOpen }>
            <DialogHeader>Update Device!</DialogHeader>
            <DialogBody>
                <form className="bg-white px-8 pt-6 pb-8 mb-4" onSubmit={ handleSubmit }>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Name <span className="text-red-400">*</span>
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            required
                            value={ name }
                            onChange={ (e) => setName(e.target.value) }
                            placeholder="Name" />
                    </div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Device Type <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"

                            id="type"
                            required
                            value={ type }
                            onChange={ (e) => setType(e.target.value) }
                        >
                            <option>Switch</option>
                            <option>Access Point</option>
                            <option>Domain</option>
                            <option>Others</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                    <div className="my-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            IP address <span className="text-red-400">*</span>
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="ip"
                            type="text"
                            placeholder="IP Address"
                            required
                            value={ ip }
                            onChange={ (e) => setIP(e.target.value) }
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Location <span className="text-red-400">*</span>
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="location"
                            type="text"
                            placeholder="Location of Device"
                            required
                            value={ location }
                            onChange={ (e) => setLocation(e.target.value) }
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Description
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="description"
                            type="text"
                            placeholder="Description of Device"
                            value={ description }
                            onChange={ (e) => setDescription(e.target.value) }
                        />
                    </div>

                    <div className="flex items-center justify-center mx-4">
                        { !isPending && <Button className="flex items-center gap-6 px-6 py-3 mt-4 text-sm" size="sm" onClick={ handleSubmit } type='submit'>
                            Update Device
                        </Button> }
                        { isPending && <Button className="flex items-center gap-6 px-6 py-3 mt-4 text-sm" size="sm" onClick={ handleSubmit } type='submit'>
                            Update Device
                        </Button> }
                    </div>
                    <div className="flex items-center justify-center mx-4">
                        { !isPending && <Button className="flex items-center gap-6 px-6 py-3 mt-4 text-sm bg-red-400" size="sm" onClick={ handleDelete } type='submit'>
                            Delete Device
                        </Button> }
                        { isPending && <Button className="flex items-center gap-6 px-6 py-3 mt-4 text-sm bg-red-400" size="sm" onClick={ handleDelete } type='submit'>
                            Delete Device
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

export default EditDeviceForm;