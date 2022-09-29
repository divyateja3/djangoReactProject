import React, {useCallback, useEffect, useState} from "react";
import {Bar, BarChart, Brush, CartesianGrid, ReferenceLine, Tooltip, XAxis, YAxis} from "recharts";
import {Container, Form} from "react-bootstrap";
import './App.css';
import {API_RETURNS_URL} from "./constants";
import axios from "axios";

// Example data
const data = [
    {
        "date": "2022-01-09",
        "returns": 0.005302144
    },
    {
        "date": "2022-08-31",
        "returns": -0.000233863
    },
    {
        "date": "2022-08-30",
        "returns": 0.001326985
    },
    {
        "date": "2022-08-29",
        "returns": -0.013552014
    },
    {
        "date": "2022-08-26",
        "returns": -0.045143739
    },
    {
        "date": "2022-08-25",
        "returns": 0.017505798
    },
    {
        "date": "2022-08-24",
        "returns": 0.00776538
    },
    {
        "date": "2022-08-23",
        "returns": -0.009705838
    },
    {
        "date": "2022-08-22",
        "returns": -0.026740299
    },
    {
        "date": "2022-08-19",
        "returns": -0.016789312
    },
    {
        "date": "2022-08-18",
        "returns": -0.01630473
    },
    {
        "date": "2022-08-17",
        "returns": 0.071702945
    },
    {
        "date": "2022-08-16",
        "returns": -0.008439134
    },
    {
        "date": "2022-08-15",
        "returns": 0.002620741
    },
    {
        "date": "2022-12-08",
        "returns": 0.012125805
    },
    {
        "date": "2022-11-08",
        "returns": -0.004751848
    },
    {
        "date": "2022-10-08",
        "returns": 0.028708876
    },
    {
        "date": "2022-09-08",
        "returns": -0.027467552
    },
    {
        "date": "2022-08-08",
        "returns": -0.008158072
    },
    {
        "date": "2022-05-08",
        "returns": -0.001196083
    },
    {
        "date": "2022-04-08",
        "returns": -0.005870987
    },
    {
        "date": "2022-03-08",
        "returns": 0.024984765
    },
    {
        "date": "2022-02-08",
        "returns": -0.016113318
    },
    {
        "date": "2022-01-08",
        "returns": -0.004996271
    },
    {
        "date": "2022-07-29",
        "returns": 0.022805278
    },
    {
        "date": "2022-07-28",
        "returns": 0.026622817
    },
    {
        "date": "2022-07-27",
        "returns": 0.020292402
    },
    {
        "date": "2022-07-26",
        "returns": 0.007323354
    },
    {
        "date": "2022-07-25",
        "returns": -0.006238004
    },
    {
        "date": "2022-07-22",
        "returns": -0.016903845
    },
    {
        "date": "2022-07-21",
        "returns": 0.06115468
    },
    {
        "date": "2022-07-20",
        "returns": 0.006719301
    },
    {
        "date": "2022-07-19",
        "returns": 0.034315003
    },
    {
        "date": "2022-07-18",
        "returns": -0.031305226
    },
    {
        "date": "2022-07-15",
        "returns": 0.02545737
    },
    {
        "date": "2022-07-14",
        "returns": -0.023345976
    },
    {
        "date": "2022-07-13",
        "returns": -0.004948004
    },
    {
        "date": "2022-12-07",
        "returns": -0.03151397
    },
    {
        "date": "2022-11-07",
        "returns": 0.004979185
    },
    {
        "date": "2022-08-07",
        "returns": -0.005196914
    },
    {
        "date": "2022-07-07",
        "returns": 0.016256808
    },
    {
        "date": "2022-06-07",
        "returns": 0.005142668
    },
    {
        "date": "2022-05-07",
        "returns": 0.011324553
    },
    {
        "date": "2022-01-07",
        "returns": 0.005472788
    },
    {
        "date": "2022-06-30",
        "returns": 0.007379134
    },
    {
        "date": "2022-06-29",
        "returns": 0.007175783
    },
    {
        "date": "2022-06-28",
        "returns": -0.029111738
    },
    {
        "date": "2022-06-27",
        "returns": -0.005936154
    },
    {
        "date": "2022-06-24",
        "returns": 0.022681285
    },
    {
        "date": "2022-06-23",
        "returns": 0.042179233
    },
    {
        "date": "2022-06-22",
        "returns": -0.000702465
    },
    {
        "date": "2022-06-21",
        "returns": 0.0103806
    },
    {
        "date": "2022-06-17",
        "returns": -0.019571996
    },
    {
        "date": "2022-06-16",
        "returns": -0.012964758
    },
    {
        "date": "2022-06-15",
        "returns": 0.003965166
    },
    {
        "date": "2022-06-14",
        "returns": -0.002321937
    },
    {
        "date": "2022-06-13",
        "returns": -0.035581023
    },
    {
        "date": "2022-10-06",
        "returns": -0.028757837
    },
    {
        "date": "2022-09-06",
        "returns": -0.021286644
    },
    {
        "date": "2022-08-06",
        "returns": -0.015981324
    },
    {
        "date": "2022-07-06",
        "returns": 0.009950586
    },
    {
        "date": "2022-06-06",
        "returns": -0.008439879
    },
    {
        "date": "2022-03-06",
        "returns": -0.004725019
    },
    {
        "date": "2022-02-06",
        "returns": 0.048826062
    },
    {
        "date": "2022-01-06",
        "returns": -0.035042333
    },
    {
        "date": "2022-05-31",
        "returns": -0.022903102
    },
    {
        "date": "2022-05-27",
        "returns": 0.054097699
    },
    {
        "date": "2022-05-26",
        "returns": 0.028825386
    },
    {
        "date": "2022-05-25",
        "returns": -0.032392894
    },
    {
        "date": "2022-05-24",
        "returns": -0.012462296
    },
    {
        "date": "2022-05-23",
        "returns": 0.006792935
    },
    {
        "date": "2022-05-20",
        "returns": 0.022303922
    },
    {
        "date": "2022-05-19",
        "returns": 0.013328918
    },
    {
        "date": "2022-05-18",
        "returns": -0.018605785
    },
    {
        "date": "2022-05-17",
        "returns": 0.023108894
    },
    {
        "date": "2022-05-16",
        "returns": 0.007706483
    },
    {
        "date": "2022-05-13",
        "returns": 0.027985878
    },
    {
        "date": "2022-12-05",
        "returns": 0.018773577
    },
    {
        "date": "2022-11-05",
        "returns": -0.022719479
    },
    {
        "date": "2022-10-05",
        "returns": 0.031208558
    },
    {
        "date": "2022-09-05",
        "returns": -0.065824248
    },
    {
        "date": "2022-06-05",
        "returns": -0.008759722
    },
    {
        "date": "2022-05-05",
        "returns": -0.032858274
    },
    {
        "date": "2022-04-05",
        "returns": 0.031862745
    },
    {
        "date": "2022-03-05",
        "returns": 0.023668144
    },
    {
        "date": "2022-02-05",
        "returns": 0.002515301
    },
    {
        "date": "2022-04-29",
        "returns": -0.014786057
    },
    {
        "date": "2022-04-28",
        "returns": 0.028721958
    },
    {
        "date": "2022-04-27",
        "returns": -0.002204511
    },
    {
        "date": "2022-04-26",
        "returns": -0.028900782
    },
    {
        "date": "2022-04-25",
        "returns": 0.001071546
    },
    {
        "date": "2022-04-22",
        "returns": -0.031686487
    },
    {
        "date": "2022-04-21",
        "returns": -0.031537451
    },
    {
        "date": "2022-04-20",
        "returns": 0.02244527
    },
    {
        "date": "2022-04-19",
        "returns": 0.021721576
    },
    {
        "date": "2022-04-18",
        "returns": -0.020563113
    },
    {
        "date": "2022-04-14",
        "returns": -0.014420454
    },
    {
        "date": "2022-04-13",
        "returns": 0.023127841
    },
    {
        "date": "2022-12-04",
        "returns": -0.044720402
    },
    {
        "date": "2022-11-04",
        "returns": -0.026766516
    },
    {
        "date": "2022-08-04",
        "returns": -0.007798131
    },
    {
        "date": "2022-07-04",
        "returns": 0.024263432
    },
    {
        "date": "2022-06-04",
        "returns": -0.00412727
    },
    {
        "date": "2022-05-04",
        "returns": -0.011497663
    },
    {
        "date": "2022-04-04",
        "returns": 0.007837599
    },
    {
        "date": "2022-01-04",
        "returns": 0.012393189
    },
    {
        "date": "2022-03-31",
        "returns": -0.023106366
    },
    {
        "date": "2022-03-21",
        "returns": -0.00704438
    },
    {
        "date": "2022-03-30",
        "returns": -0.021384221
    },
    {
        "date": "2022-03-29",
        "returns": 0.022153271
    },
    {
        "date": "2022-03-28",
        "returns": -0.002136917
    },
    {
        "date": "2022-03-25",
        "returns": -0.005131652
    },
    {
        "date": "2022-03-24",
        "returns": 0.016619528
    },
    {
        "date": "2022-03-23",
        "returns": -0.036686034
    },
    {
        "date": "2022-03-22",
        "returns": 0.008324951
    },
    {
        "date": "2022-03-18",
        "returns": 0.016810461
    },
    {
        "date": "2022-02-02",
        "returns": 0.022761115
    },
    {
        "date": "2022-01-02",
        "returns": 0.012273902
    },
    {
        "date": "2022-01-31",
        "returns": 0.016489129
    },
    {
        "date": "2022-01-28",
        "returns": 0.037625861
    },
    {
        "date": "2022-01-27",
        "returns": -0.010635907
    },
    {
        "date": "2022-01-26",
        "returns": -0.007876941
    },
    {
        "date": "2022-01-25",
        "returns": -0.025702288
    },
    {
        "date": "2022-01-24",
        "returns": 0.004436041
    },
    {
        "date": "2022-01-21",
        "returns": -0.014123889
    },
    {
        "date": "2022-01-20",
        "returns": -0.006764936
    },
    {
        "date": "2022-01-19",
        "returns": -0.000284758
    },
    {
        "date": "2022-01-18",
        "returns": -0.029098701
    },
    {
        "date": "2022-01-14",
        "returns": -0.003375353
    },
    {
        "date": "2022-01-13",
        "returns": -0.029028159
    },
    {
        "date": "2022-12-01",
        "returns": 0.01957174
    },
    {
        "date": "2022-11-01",
        "returns": 0.010195646
    },
    {
        "date": "2022-10-01",
        "returns": 6.89e-05
    },
    {
        "date": "2022-07-01",
        "returns": -0.026622854
    },
    {
        "date": "2022-06-01",
        "returns": 0.003499327
    },
    {
        "date": "2022-05-01",
        "returns": -0.017130763
    },
    {
        "date": "2022-04-01",
        "returns": -0.033806237
    },
    {
        "date": "2022-03-01",
        "returns": -0.018540601
    },
    {
        "date": "2021-12-31",
        "returns": -0.007645379
    },
    {
        "date": "2021-12-30",
        "returns": 0.00143161
    },
    {
        "date": "2021-12-29",
        "returns": 0.009234892
    },
    {
        "date": "2021-12-28",
        "returns": 0.002771826
    },
    {
        "date": "2021-12-27",
        "returns": 0.005956843
    },
    {
        "date": "2021-12-23",
        "returns": 0.006505912
    },
    {
        "date": "2021-12-22",
        "returns": 0.018316507
    },
    {
        "date": "2021-12-21",
        "returns": 0.023534134
    },
    {
        "date": "2021-12-20",
        "returns": -0.006604149
    },
    {
        "date": "2021-12-17",
        "returns": 0.004111346
    },
    {
        "date": "2021-12-16",
        "returns": -0.022746445
    },
    {
        "date": "2021-12-15",
        "returns": 0.015999517
    },
    {
        "date": "2021-12-14",
        "returns": -0.028216778
    },
    {
        "date": "2021-12-13",
        "returns": 0.000191989
    },
    {
        "date": "2021-10-12",
        "returns": 0.010672022
    },
    {
        "date": "2021-09-12",
        "returns": -0.010875813
    },
];


// Example Graph recharts library
function App() {

    const [opacity, setOpacity] = useState({
        uv: 1,
        pv: 1
    });

//    const [data, setData] = useState([]);

    const [equity, setEquity] = useState("10277")

    useEffect(() => {
        console.log(equity)
    }, [equity])

//    useEffect(() => {
//        // GET request using axios inside useEffect React hook
//        axios.get(API_RETURNS_URL + equity)
//            .then(response => setData(response.data.total));
//        console.log(data)
//    }, [equity]);

    const handleMouseEnter = useCallback(
        (o) => {
            const { dataKey } = o;

            setOpacity({ ...opacity, [dataKey]: 0.5 });
        },
        [opacity, setOpacity]
    );

    const handleMouseLeave = useCallback(
        (o) => {
            const { dataKey } = o;
            setOpacity({ ...opacity, [dataKey]: 1 });
        },
        [opacity, setOpacity]
    );

    return (
        <Container>
            <BarChart
              width={1600}
              height={900}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <ReferenceLine y={0} stroke="#000000" />
              <Brush dataKey="date" height={40} stroke="#8884d8" />
              <Bar dataKey="returns" fill="#8884d8" />
            </BarChart>
            <Container className="align-center form-control col-lg">
                <Form.Label>Equity_id</Form.Label>
                <Form.Control type="text" onChange={(e) => setEquity(e.target.value)} />
            </Container>
        </Container>
    );
}

export default App;
