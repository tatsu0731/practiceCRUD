const express = require("express");
const app = express();
app.use(express.json());

app.listen(80, console.log('サーバー起動開始'));

app.get("/", (req, res) => {
    res.send("プログラミングチュートリアルへようこそ");
});

// ここは実際DBから取得したい値になっているはず
const customers = [
    { title: "田中", id: 1 },
    { title: "斉藤", id: 2 },
    { title: "橋本", id: 3 },
    { title: "鈴木", id: 4 },
    { title: "安藤", id: 5 },
];

// これがmapとかで展開されると一覧画面になる
app.get("/api/customers", (req, res) => {
    res.send(customers);
});

// reqオブジェクトはクライアントからのリクエストに関する情報を含んでいる。
app.get("/api/customers/:id", (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    res.send(customer);
    console.log(req);
});

// データを送信してみよう(postMethod)
app.post("/api/customers", (req, res) => {
    // クライアントが渡してくるであろうデータ
    const customer = {
        title: req.body.title,
        id: customers.length + 1,
    };
    customers.push(customer);
    res.send(customers);
});


// データを更新したいよ
app.put("/api/customers/:id", (req, res) => {
    // データが取得される
    const customer = customers.find((c) => c.id === parseInt(req.params.id))
    // 指定されたcustomerのtitleが代入され、結果的に上書きされる
    customer.title = req.body.title;
    // send()の内容をcustomersにすることでデータ全体を送ることも可能
    res.send(customer);
});


// データを削除したいよ
app.delete("/api/customers/:id", (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id))

    const index = customers.indexOf(customer);
    customers.splice(index, 1);

    res.send(customer);
});
