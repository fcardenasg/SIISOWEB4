import { Divider, Grid } from "@mui/material";
import { Fragment } from "react";
import ReactApexChart from "react-apexcharts";

const dataAdvace = {
    series: [76, 67, 61, 90],
    options: {
        chart: {
            height: 390,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                offsetY: 0,
                startAngle: 0,
                endAngle: 270,
                hollow: {
                    margin: 5,
                    size: '30%',
                    background: 'transparent',
                    image: undefined,
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        show: false,
                    }
                }
            }
        },
        colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
        labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
        legend: {
            show: true,
            floating: true,
            fontSize: '16px',
            position: 'left',
            offsetX: 160,
            offsetY: 15,
            labels: {
                useSeriesColors: true,
            },
            markers: {
                size: 0
            },
            formatter: function (seriesName, opts) {
                return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
            },
            itemMargin: {
                vertical: 3
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    show: false
                }
            }
        }]
    },
};

const dataAdvace2 = {
    series: [{
        name: 'TEAM A',
        type: 'column',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
    }, {
        name: 'TEAM B',
        type: 'area',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
    }, {
        name: 'TEAM C',
        type: 'line',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
    }],
    options: {
        chart: {
            height: 350,
            type: 'line',
            stacked: false,
        },
        stroke: {
            width: [0, 2, 5],
            curve: 'smooth'
        },
        plotOptions: {
            bar: {
                columnWidth: '50%'
            }
        },

        fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
                inverseColors: false,
                shade: 'light',
                type: "vertical",
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [0, 100, 100, 100]
            }
        },
        labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
            '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
        ],
        markers: {
            size: 0
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            title: {
                text: 'Points',
            },
            min: 0
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(0) + " points";
                    }
                    return y;

                }
            }
        }
    },
}

const dataAdvace3 = {
    series: [{
        name: 'Inflation',
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
    }],
    options: {
        chart: {
            height: 350,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + "%";
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },

        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            position: 'top',
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            },
            tooltip: {
                enabled: true,
            }
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                    return val + "%";
                }
            }

        },
        title: {
            text: 'Monthly Inflation in Argentina, 2002',
            floating: true,
            offsetY: 330,
            align: 'center',
            style: {
                color: '#444'
            }
        }
    },
}

const ChartDataAdvace = () => {
    return (
        <Fragment>
            <Grid container xs={12} spacing={1}>
                <Grid item xs={12}>
                    <ReactApexChart options={dataAdvace.options} series={dataAdvace.series} type="radialBar" height={200} />
                </Grid>

                <Grid item xs={12}>
                    <Divider sx={{ border: 0.5 }} />
                </Grid>

                <Grid item xs={12}>
                    <ReactApexChart options={dataAdvace2.options} series={dataAdvace2.series} type="line" height={350} />
                </Grid>

                <Grid item xs={12}>
                    <Divider sx={{ border: 0.5 }} />
                </Grid>

                <Grid item xs={12}>
                    <ReactApexChart options={dataAdvace3.options} series={dataAdvace3.series} type="line" height={350} />
                </Grid>

                <Grid item xs={12}>
                    <Divider sx={{ border: 0.5 }} />
                </Grid>

                <Grid item xs={12}>
                    <ReactApexChart options={dataAdvace3.options} series={dataAdvace3.series} type="bar" height={350} />
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default ChartDataAdvace;