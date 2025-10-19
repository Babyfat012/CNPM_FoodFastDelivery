import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DelDroneManagement = () => {
    const [drones, setDrones] = useState([]);
    const [form, setForm] = useState({
        droneId: '',
        batteryLevel: 100,
        maxPayload: 3,
        status: 'AVAILABLE',
        latitude: '',
        longitude: ''
    });

    const fetchDrones = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/drones');
            setDrones(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchDrones();
    }, []);

    const handleAddDrone = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/drones', {
                droneId: form.droneId,
                batteryLevel: form.batteryLevel,
                maxPayload: form.maxPayload,
                status: form.status,
                currentLocation: {
                    latitude: form.latitude,
                    longitude: form.longitude
                }
            });
            setForm({
                droneId: '',
                batteryLevel: 100,
                maxPayload: 5,
                status: 'AVAILABLE',
                latitude: '',
                longitude: ''
            });
            fetchDrones();
        } catch (err) {
            alert('Error adding drone');
        }
    };

    const handleDeleteDrone = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/drones/${id}`);
            fetchDrones();
        } catch (err) {
            alert('Error deleting drone');
        }
    };

    return (
        <div className="bg-gray-100 ml-60 mt-[78px] min-h-screen pt-4 w-full font-poppins">
            <div className="w-full max-w-4xl p-8 bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-6 text-center">Drone Management</h2>
                <form className="mb-8 p-4 rounded shadow bg-gray-50" onSubmit={handleAddDrone}>
                    <div className="flex flex-wrap gap-4 justify-center mb-2">
                        <input
                            type="text"
                            placeholder="Drone ID"
                            value={form.droneId}
                            onChange={e => setForm({ ...form, droneId: e.target.value })}
                            required
                            className="border p-2 rounded w-40"
                        />
                        <input
                            type="number"
                            placeholder="Battery Level"
                            value={form.batteryLevel}
                            onChange={e => setForm({ ...form, batteryLevel: e.target.value })}
                            min={0}
                            max={100}
                            required
                            className="border p-2 rounded w-32"
                        />
                        <input
                            type="number"
                            placeholder="Max Payload (kg)"
                            value={form.maxPayload}
                            onChange={e => setForm({ ...form, maxPayload: e.target.value })}
                            min={1}
                            required
                            className="border p-2 rounded w-32"
                        />
                        <select
                            value={form.status}
                            onChange={e => setForm({ ...form, status: e.target.value })}
                            className="border p-2 rounded w-40"
                        >
                            <option value="AVAILABLE">AVAILABLE</option>
                            <option value="IN_DELIVERY">IN_DELIVERY</option>
                            <option value="MAINTENANCE">MAINTENANCE</option>
                            <option value="OFFLINE">OFFLINE</option>
                        </select>
                        <input
                            type="number"
                            placeholder="Latitude"
                            value={form.latitude}
                            onChange={e => setForm({ ...form, latitude: e.target.value })}
                            className="border p-2 rounded w-32"
                        />
                        <input
                            type="number"
                            placeholder="Longitude"
                            value={form.longitude}
                            onChange={e => setForm({ ...form, longitude: e.target.value })}
                            className="border p-2 rounded w-32"
                        />
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded h-fit">Add Drone</button>
                    </div>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {drones.map(drone => (
                        <div key={drone._id} className="bg-white p-4 rounded shadow flex flex-col gap-2">
                            <div className="font-bold text-lg">Drone ID: {drone.droneId}</div>
                            <div>Status: <span className="font-semibold">{drone.status}</span></div>
                            <div>Battery: {drone.batteryLevel}%</div>
                            <div>Max Payload: {drone.maxPayload} kg</div>
                            <div>
                                Location: {drone.currentLocation?.latitude}, {drone.currentLocation?.longitude}
                            </div>
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded mt-2 w-fit"
                                onClick={() => handleDeleteDrone(drone._id)}
                            >
                                Delete
                            </button>
                            <div>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${drone.currentLocation?.latitude},${drone.currentLocation?.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    Track Drone
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DelDroneManagement;
