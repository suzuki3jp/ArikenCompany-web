fetch("http://suzuki-dev.com:3150/chatters")
    .then((response) => response.json())
    .then((ranking) => {
        const array = Object.entries(ranking);
        const final = array.filter((item) => { return isNaN(item[0])})
        final.sort((a, b) => {
            return b[1] - a[1];
        })
        const sortedObj = Object.fromEntries(final);
        const IGNORE_MIN_SIZE = 1000;
        
        const main = document.getElementsByClassName("main")[0];
        const rankingTable = document.createElement("table");
        const rankingHeader = document.createElement("thead");
        const rankingBody = document.createElement("tbody");
        const rankingHeaderLine = document.createElement("tr");
        const rankingHeaderTitle1 = document.createElement("th");
        const rankingHeaderTitle2 = document.createElement("th");
        const rankingHeaderTitle3 = document.createElement("th");
        const startedAt = document.createElement("div");

        /* ヘッダー */
        rankingHeaderTitle1.textContent = "順位";
        rankingHeaderTitle1.style.border = "1px solid black"
        rankingHeaderTitle1.style.width = "20%";

        rankingHeaderTitle2.textContent = "ID";
        rankingHeaderTitle2.style.border = "1px solid black"
        rankingHeaderTitle2.style.width = "60%";

        rankingHeaderTitle3.textContent = "コメント数";
        rankingHeaderTitle3.style.border = "1px solid black";
        rankingHeaderTitle3.style.align = "left"


        rankingHeaderLine.appendChild(rankingHeaderTitle1);
        rankingHeaderLine.appendChild(rankingHeaderTitle2);
        rankingHeaderLine.appendChild(rankingHeaderTitle3)
        rankingHeader.appendChild(rankingHeaderLine);

        /* テーブルボディー */
        const rankingKeys = Object.keys(sortedObj);
        rankingKeys.forEach((value, index) => {
            if (sortedObj[value] < IGNORE_MIN_SIZE) return;
            const row = document.createElement("tr");
            const place = document.createElement("th");
            const id = document.createElement("th");
            const size = document.createElement("th");
            if (index + 1 === 1) place.style.backgroundColor = "red"
            if (index + 1 === 2) place.style.backgroundColor = "blue"
            if (index + 1 === 3 ) place.style.backgroundColor = "yellow"
            if (index + 1 > 3) place.style.backgroundColor = "gray"
            place.textContent = index + 1;
            place.style.border = "1px solid black"
            id.textContent = value;
            id.style.textAlign = "left";
            id.style.border = "1px solid black"
            size.textContent = sortedObj[value];
            size.style.textAlign = "left";
            size.style.border = "1px solid black"
            row.appendChild(place)
            row.appendChild(id);
            row.appendChild(size);
            rankingBody.appendChild(row);
        })
        startedAt.textContent = IGNORE_MIN_SIZE + "未満は圏外" + "(2022/11/18より取得開始)";
        // /* テーブル */
        rankingTable.appendChild(rankingHeader);
        rankingTable.appendChild(rankingBody);
        rankingTable.style.border = "1px solid black"
        rankingTable.style.borderCollapse = "collapse"
        rankingTable.className = "chatters-table"

        main.appendChild(rankingTable);
        main.appendChild(startedAt)
    });