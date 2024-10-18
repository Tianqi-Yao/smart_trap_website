'use client';

export default function Dashboard() {
    return (
        <div className="min-h-screen flex flex-col items-center gap-8 p-8 bg-blue-50 bg-opacity-90 max-w-5xl mx-auto ">
            <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 max-w-3xl w-full text-center">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Real-Time Monitoring for Spotted Wing Drosophila (SWD)</h2>
                <p className="text-lg text-gray-700">
                    👋 Hello and welcome!
                </p>
                <p className="text-gray-700">Our smart monitoring system tracks Spotted Wing Drosophila (SWD) in real-time using advanced insect traps equipped with cameras and AI. Farmers can monitor their fields remotely, receive live data, and get instant alerts about SWD activity, helping them take timely action to protect their crops.</p>
            </div>
            <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 max-w-3xl w-full text-center">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Stay Connected</h2>
                <p className="text-gray-700">Stay connected to your fields with real-time updates and make data-driven decisions for effective pest management.</p>
            </div>
            <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 max-w-3xl w-full text-center">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Activity</h2>
                <ul className="text-gray-700 list-disc list-inside">
                    <li>Data collected from South Field on October 12, 2024.</li>
                    <li>Maintenance completed for monitoring device at Lloyd Farm on October 8, 2024.</li>
                    <li>Updated system firmware for all devices on October 6, 2024.</li>
                    <li>Data synchronization with cloud completed on October 5, 2024.</li>
                </ul>
            </div>
        </div>
    );
}
