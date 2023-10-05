'use strict'

// テンプレにデータをセットする関数
function setAwardData(selecter, data) {
    selecter.find(".data-thumb").attr("style", `background-image: url("assets/img/app/${data.id}.png");`); // サムネイル
    selecter.find(".data-title").text(data.title); // タイトル
    selecter.find(".data-name").text(data.name); // 応募者名
    selecter.find(".data-page").attr("href", data.page); // 作品リンク
    selecter.find(".data-source").attr("href", data.source); // GitHubのURL
    selecter.find(".data-desc").text(data.desc); // 作品の説明
}

// 受賞作品
setAwardData($(".nhigh.grand-prize"), datas.filter( e => e.category === "N/S高等学校部門" && e.award === "最優秀賞")[0]);
setAwardData($(".nhigh.first-place"), datas.filter( e => e.category === "N/S高等学校部門" && e.award === "優秀賞")[0]);
setAwardData($(".nhigh.design-prize"), datas.filter( e => e.category === "N/S高等学校部門" && e.award === "デザイン特別賞")[0]);
setAwardData($(".nhigh.idea-prize"), datas.filter( e => e.category === "N/S高等学校部門" && e.award === "アイデア特別賞")[0]);
setAwardData($(".nprog.grand-prize"), datas.filter( e => e.category === "N中等部部門" && e.award === "最優秀賞")[0]);
setAwardData($(".nprog.first-prize"), datas.filter( e => e.category === "N中等部部門" && e.award === "優秀賞")[0]);
setAwardData($(".nprep.grand-prize"), datas.filter( e => e.category === "N予備校部門" && e.award === "最優秀賞")[0]);
setAwardData($(".nprep.tech-prize"), datas.filter( e => e.category === "N予備校部門" && e.award === "技術特別賞")[0]);


// 健闘賞一覧
const contentTemplate = $(".template"); // HTMLテンプレ部品を読込み
for (let data of datas.filter(e => e.award === "健闘賞")) { // 受賞作品以外でループ
    const content = contentTemplate.clone(true); // HTMLテンプレ部品をコピー
    setAwardData(content, data); // データをセット
    contentTemplate.after(content); // HTMLに追加
}
contentTemplate.hide(); // テンプレを非表示
