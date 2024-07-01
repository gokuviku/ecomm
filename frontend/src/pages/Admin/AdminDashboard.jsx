import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import Loader from '../../components/Loader'
import {
    useGetTotalOrdersQuery,
    useGetTotalSalesByDateQuery,
    useGetTotalSalesQuery,
} from '../../redux/api/orderApiSlice'
import { useGetUsersQuery } from '../../redux/api/usersApiSlice'
import AdminMenu from './AdminMenu'

const AdminDashboard = () => {
    const { data: sales, isLoading: isSalesLoading } = useGetTotalSalesQuery()
    const { data: customers, isLoading: isCustomersLoading } = useGetUsersQuery()
    const { data: orders, isLoading: isOrdersLoading } = useGetTotalOrdersQuery()
    const { data: salesDetail } = useGetTotalSalesByDateQuery()
    const [state, setState] = useState({
        options: {
            chart: {
                type: 'line',
            },
            tooltip: {
                theme: 'dark',
            },
            colors: ["#00E396"],
            dataLabels: {
                enabled: true,
            },
            stroke: {
                curve: 'smooth',
            },
            title: {
                text: 'Sales Trend',
                align: 'left',
            },
            grid: {
                borderColor: '#ccc',
            },
            markers: {
                size: 1
            },
            xaxis: {
                categories: [],
                title: {
                    text: "Date",
                },
            },
            yaxis: {
                title: {
                    text: "Sales",
                },
                min: 0,
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5,
            },
        },
        series: [{ name: "Sales", data: [] }],
    })

    useEffect(() => {
        if (salesDetail) {
            const formattedSalesData = salesDetail.map((item) => ({
                x: item._id,
                y: item.totalSales,
            }))

            setState((prevState) => ({
                ...prevState,
                options: {
                    ...prevState.options,
                    xaxis: {
                        categories: formattedSalesData.map((item) => item.x)
                    },
                },
                series: [
                    { name: "Sales", data: formattedSalesData.map((item) => item.y) },
                ],
            }))
        }
    }, [salesDetail])

    return (
        <>
            <AdminMenu />
            <section className='xl:ml-[4rem] md:ml-[0rem]'>
                <div className="flex justify-around flex-wrap w-[80%]">
                    <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
                        <div className="font-bold rounded-full bg-pink-500 w-[3rem] text-center p-3">
                            $
                        </div>
                        <p className="mt-5">Sales</p>
                        <h1 className="text-xl font-bold">
                            {isSalesLoading ? <Loader /> : `$${sales.totalSales.toFixed(2)}`}
                        </h1>
                    </div>

                    <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
                        <div className="font-bold rounded-full bg-pink-500 w-[3rem] text-center p-3">
                            $
                        </div>
                        <p className="mt-5">Customers</p>
                        <h1 className="text-xl font-bold">
                            {isCustomersLoading ? <Loader /> : customers.length}
                        </h1>
                    </div>

                    <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
                        <div className="font-bold rounded-full bg-pink-500 w-[3rem] text-center p-3">
                            $
                        </div>
                        <p className="mt-5">All Orders</p>
                        <h1 className="text-xl font-bold">
                            {isOrdersLoading ? <Loader /> : orders?.totalOrders}
                        </h1>
                    </div>

                    <div className="ml-[10rem] mt-[4rem]">
                        <Chart options={state.options} series={state.series} type="line" width='70%' />
                    </div>
                </div>
            </section>
        </>
    )
}

export default AdminDashboard
