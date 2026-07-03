/**
 * 塔羅貓 (tarotcat) 核心邏輯 - app.js
 */

// 1. 全域變數定義
let allCards = [
  // 大阿爾克那 (22張)
  { filename: "The_Fool_MeowsticTarot.png", name: "愚者", upright: "開始 自由 無知無畏 隨遇而安 純真 冒險 新起點", reversed: "躁動 盲目 缺乏計劃 輕率 愚昧 衝動 迷惘" },
  { filename: "The_Magician_MeowsticTarot.png", name: "魔術師", upright: "創造力 專注 專長 溝通 意志力 資源豐富 主動性", reversed: "欺騙 幻滅 缺乏動力 才能受阻 計劃不周 意志薄弱" },
  { filename: "The_High_Priestess_MeowsticTarot.png", name: "女祭司", upright: "直覺 潛意識 神秘 智慧 靜止 內省 洞察力", reversed: "表面化 焦慮 忽略直覺 理性過度 秘密曝光 情感壓抑" },
  { filename: "The_Empress_MeowsticTarot.png", name: "皇后", upright: "豐收 孕育 自然 溫柔 創造力 美麗 物質享受 豐盛", reversed: "缺乏安全感 創造力受阻 過度保護 浪費 情感勒索" },
  { filename: "The_Emperor_MeowsticTarot.png", name: "皇帝", upright: "權力 控制 秩序 穩定 父親形象 紀律 領導力 理性", reversed: "專制 暴政 軟弱 缺乏控制 混亂 傲慢 濫用權力" },
  { filename: "The_Hierophant_MeowsticTarot.png", name: "教皇", upright: "傳統 信仰 導師 儀式 體制 精神指引 尋求認同", reversed: "叛逆 突破傳統 質疑權威 新觀點 思想解放 迷信" },
  { filename: "The_Lovers_MeowsticTarot.png", name: "戀人", upright: "愛情 選擇 和諧 伴侶 价值观 契合 吸引力", reversed: "不和諧 錯誤抉擇 情感疏離 衝突 分道揚鑣 逃避承諾" },
  { filename: "The_Chariot_MeowsticTarot.png", name: "戰車", upright: "意志力 勝利 克服困難 自控 決心 快速進展 衝刺", reversed: "失去控制 失控 挫折 失去方向 魯莽 停滯不前" },
  { filename: "Strength_MeowsticTarot.png", name: "力量", upright: "勇氣 耐心 溫柔掌控 內在力量 克服恐懼 自信 韌性", reversed: "軟弱 焦躁 恐懼 自我懷疑 濫用暴力 情緒失控" },
  { filename: "The_Hermit_MeowsticTarot.png", name: "隱士", upright: "孤獨 內省 尋求真理 導師 智慧 沉思 謹慎 獨處", reversed: "孤立 寂寞 偏執 逃避現實 拒絕指引 思想封閉" },
  { filename: "Wheel_of_Fortune_MeowsticTarot.png", name: "命運之輪", upright: "好運 命運 轉折點 機遇 順應變化 業力 因果輪迴", reversed: "逆境 阻礙 厄運 拒絕變化 舊習難改 失去掌控" },
  { filename: "Justice_MeowsticTarot.png", name: "正義", upright: "公平 誠實 決定 因果 法律 責任 平衡 客觀", reversed: "不公 偏見 法律糾紛 不願承擔 逃避責任 不正當行為" },
  { filename: "The_Hanged_Man_MeowsticTarot.png", name: "倒吊人", upright: "犧牲 換個角度 停滯 臣服 放手 內在平靜 等待", reversed: "無謂犧牲 掙扎 拖延 拒絕改變 徒勞無功 焦躁不安" },
  { filename: "Death_MeowsticTarot.png", name: "死神", upright: "結束 轉變 新生 放手 必然的改變 淘汰 告別", reversed: "抗拒改變 停滯 苟延殘喘 恐懼結束 重新起步困難" },
  { filename: "Temperance_MeowsticTarot.png", name: "節制", upright: "平衡 協調 融合 淨化 耐心 溝通 節制 自我控制", reversed: "失衡 衝突 缺乏耐心 溝通不良 過度消耗 無法融入" },
  { filename: "The_Devil_MeowsticTarot.png", name: "惡魔", upright: "束縛 慾望 物質主義 執著 誘惑 陰暗面 沉迷", reversed: "解脫 覺醒 擺脫束縛 面對陰暗 克服誘惑 精神重獲自由" },
  { filename: "The_Tower_MeowsticTarot.png", name: "高塔", upright: "劇變 崩毀 意外 幻滅 覺醒 突破 解放 震驚", reversed: "避免災難 延緩危機 重建期 害怕改變 餘波盪漾" },
  { filename: "The_Star_MeowsticTarot.png", name: "星星", upright: "希望 信心 靈感 療癒 寧靜 樂觀 前景光明 自然", reversed: "失望 失去信心 靈感枯竭 焦慮 悲觀 缺乏方向" },
  { filename: "The_Moon_MeowsticTarot.png", name: "月亮", upright: "不安 恐懼 幻覺 潛意識 欺騙 直覺 混亂 秘密", reversed: "消除恐懼 誤會冰釋 真相大白 直覺復甦 擺擺脫陰影" },
  { filename: "The_Sun_MeowsticTarot.png", name: "太陽", upright: "喜悅 成功 活力 溫暖 自信 明朗 榮耀 真理", reversed: "暫時受挫 缺乏活力 虛榮 驕傲過度 延遲的成功" },
  { filename: "Judgement_MeowsticTarot.png", name: "審判", upright: "覺醒 呼喚 決定 業力 評估 解放 新生 自省", reversed: "逃避呼喚 自我懷疑 遲疑決策 悔恨 拒絕反省" },
  { filename: "The_World_MeowsticTarot.png", name: "世界", upright: "完成 圓滿 旅行 統合 成功 自由 達成目標 終點", reversed: "未完成 延遲 挫折 缺乏進展 完美主義 停滯不前" },

  // 權杖花色 (14張)
  { filename: "Ace_of_Wands_MeowsticTarot.png", name: "權杖首牌", upright: "新計畫 行動力 激情 靈感 冒險 開始 創造力", reversed: "缺乏動力 延遲 缺乏靈感 虎頭蛇尾 衝動行事" },
  { filename: "2_of_Wands_MeowsticTarot.png", name: "權杖二", upright: "規劃 決策 遠見 探索 掌控 跨出第一步 展望未來", reversed: "規劃不周 猶豫不決 局限安全區 害怕未知 延誤時機" },
  { filename: "3_of_Wands_MeowsticTarot.png", name: "權杖三", upright: "擴展 遠瞻 合作 探索 成功在望 商業旅行 前瞻性", reversed: "進展受阻 回歸本處 合作失敗 視野狹隘 缺乏耐性" },
  { filename: "4_of_Wands_MeowsticTarot.png", name: "權杖四", upright: "慶祝 和諧 繁榮 社群 安全感 穩定 回家 喜悅", reversed: "缺乏穩定 關係不和 暫時停滯 缺乏安全感 家庭糾紛" },
  { filename: "5_of_Wands_MeowsticTarot.png", name: "權杖五", upright: "衝突 競爭 混亂 意見分歧 挑戰 活力 競爭對手", reversed: "避免衝突 妥協 達成共識 混亂結束 惡性競爭" },
  { filename: "6_of_Wands_MeowsticTarot.png", name: "權杖六", upright: "勝利 榮耀 認同 成功 自信 帶領 凱旋歸來", reversed: "缺乏認同 延遲的成功 驕傲自滿 失敗 失去支持" },
  { filename: "7_of_Wands_MeowsticTarot.png", name: "權杖七", upright: "防守 堅持 挑戰 勇氣 孤軍奮戰 克服障礙 保護成果", reversed: "妥協 放棄 壓力過大 失去防線 猶豫不決 自我懷疑" },
  { filename: "8_of_Wands_MeowsticTarot.png", name: "權杖八", upright: "迅速 行動 快速變化 旅行 訊息 執行力 目標明確", reversed: "延誤 混亂 阻礙 衝動出錯 計劃停滯 溝通中斷" },
  { filename: "9_of_Wands_MeowsticTarot.png", name: "權杖九", upright: "防備 堅持 韌性 最後防線 疲憊 警惕 考驗", reversed: "防線崩潰 放棄 疲憊不堪 拒絕防備 頑固不化 舊傷復發" },
  { filename: "10_of_Wands_MeowsticTarot.png", name: "權杖十", upright: "負擔 壓力責任 過度勞累 堅持 目標在望 重擔", reversed: "釋放壓力 崩潰 拒絕承擔 責任轉移 過度操勞致病" },
  { filename: "Page_of_Wands_MeowsticTarot.png", name: "權杖侍從", upright: "熱情 消息 好奇心 冒險精神 新計劃 學習 熱情洋溢", reversed: "缺乏熱情 壞消息 幼稚 延遲 缺乏耐心 虎頭蛇尾" },
  { filename: "Knight_of_Wands_MeowsticTarot.png", name: "權杖騎士", upright: "衝勁 冒險 挑戰 改變 迅速 激情 勇敢 追求目標", reversed: "魯莽 衝動 延誤 脾氣暴躁 失去方向 計劃夭折" },
  { filename: "Queen_of_Wands_MeowsticTarot.png", name: "權杖皇后", upright: "熱情 自信 魅力 溫暖 獨立 社交能力 強大意志力", reversed: "嫉妒 傲慢 脾氣暴躁 情緒化 缺乏自信 掌控慾強" },
  { filename: "King_of_Wands_MeowsticTarot.png", name: "權杖國王", upright: "領導力 願景 勇氣 創業家精神 尊嚴 決策力 權威", reversed: "專制 獨裁 脾氣暴躁 缺乏遠見 行動受阻 傲慢" },

  // 聖杯花色 (14張)
  { filename: "Ace_of_Cups_MeowsticTarot.png", name: "聖杯首牌", upright: "情感開始 愛 直覺 喜悅 滿溢的感情 心靈滿足", reversed: "情感壓抑 失望 缺乏愛 直覺受阻 虛情假意" },
  { filename: "2_of_Cups_MeowsticTarot.png", name: "聖杯二", upright: "結合 伴侶 吸引力 平等 合作 和諧 情感契合", reversed: "情感衝突 關係破裂 不平等 溝通不良 拒絕合作" },
  { filename: "3_of_Cups_MeowsticTarot.png", name: "聖杯三", upright: "慶祝 友誼 社群 分享 喜悅 聚會 三人行", reversed: "孤立 社交排斥 過度放縱 朋友圈分裂 八卦糾紛" },
  { filename: "4_of_Cups_MeowsticTarot.png", name: "聖杯四", upright: "冷漠 沉思 厭倦 錯過機會 退縮 不滿現狀 沉浸自我", reversed: "重新出發 接受機會 擺脫倦怠 轉念 重新關注外界" },
  { filename: "5_of_Cups_MeowsticTarot.png", name: "聖杯五", upright: "悲傷 失去 失望 專注失去的部分 遺憾 沮喪 情感低潮", reversed: "走出陰霾 接受失去 重獲希望 發現機會 療癒期" },
  { filename: "6_of_Cups_MeowsticTarot.png", name: "聖杯六", upright: "懷舊 童年 回憶 安全感 分享 贈予 純真 舊識重逢", reversed: "沉迷過去 無法前進 幼稚 脫離現實 遺忘初衷" },
  { filename: "7_of_Cups_MeowsticTarot.png", name: "聖杯七", upright: "幻想 選擇 混亂 白日夢 誘惑 缺乏焦點 眾多機會", reversed: "釐清方向 做出選擇 真相大白 擺脫幻想 採取行動" },
  { filename: "8_of_Cups_MeowsticTarot.png", name: "聖杯八", upright: "離去 放手 尋求精神意義 放棄物質 追尋自我 轉移目標", reversed: "停留原地 害怕改變 拒絕放手 迷失方向 缺乏勇氣" },
  { filename: "9_of_Cups_MeowsticTarot.png", name: "聖杯九", upright: "滿足 願望實現 享樂 自滿 物質與精神富足 美夢成真", reversed: "不滿足 貪婪 物質過度 自大 願望落空 虛假快樂" },
  { filename: "10_of_Cups_MeowsticTarot.png", name: "聖杯十", upright: "家庭和諧 幸福 圓滿的愛 社群支持 情感巔峰 平安", reversed: "家庭衝突 關係疏離 缺乏和諧 期待落空 情感不睦" },
  { filename: "Page_of_Cups_MeowsticTarot.png", name: "聖杯侍從", upright: "敏感 消息 直覺 藝術氣息 溫柔 好奇心 情感萌芽", reversed: "情緒化 幼稚 壞消息 幻想過度 情感勒索 逃避現實" },
  { filename: "Knight_of_Cups_MeowsticTarot.png", name: "聖杯騎士", upright: "浪漫 追求 邀請 魅力 調停者 情感表達 追隨直覺", reversed: "虛情假意 情緒化 逃避 承諾落空 嫉妒 缺乏誠意" },
  { filename: "Queen_of_Cups_MeowsticTarot.png", name: "聖杯皇后", upright: "直覺 溫柔 體貼 同理心 母親般溫暖 情感豐富", reversed: "情緒起伏 依賴 敏感過度 情感勒索 缺乏理智 焦慮" },
  { filename: "King_of_Cups_MeowsticTarot.png", name: "聖杯國王", upright: "情感成熟 寬容 掌控情緒 智慧 調解 穩重 藝術品味", reversed: "情緒失控 操縱情感 虛偽 冷酷 軟弱無能 濫好人" },

  // 寶劍花色 (14張)
  { filename: "Ace_of_Swords_MeowsticTarot.png", name: "寶劍首牌", upright: "突破 理智 勝利 真相 決心 精神力量 新觀點", reversed: "混亂 決策失誤 濫用權力 阻礙 思考受阻 衝突" },
  { filename: "2_of_Swords_MeowsticTarot.png", name: "寶劍二", upright: "逃避 抉擇 僵局 封閉自我 逃避決策 兩難 平衡", reversed: "解除防衛 做出選擇 真相顯現 混亂 突破僵局" },
  { filename: "3_of_Swords_MeowsticTarot.png", name: "寶劍三", upright: "傷心 痛苦 悲傷 失去 背叛 情感撕裂 衝突 療癒起點", reversed: "療癒期 釋放痛苦 拒絕原諒 舊傷復發 悲傷延續" },
  { filename: "4_of_Swords_MeowsticTarot.png", name: "寶劍四", upright: "休息 冥想 復原 暫停 內省 避難所 沉思", reversed: "重新行動 焦躁 復甦 缺乏休息 強迫工作 精神崩潰" },
  { filename: "5_of_Swords_MeowsticTarot.png", name: "寶劍五", upright: "衝突 贏了面子輸了裡子 失敗 自私 敵意 爭吵 挫敗", reversed: "尋求和解 衝突結束 雙輸局面 怨恨不消 拒絕妥協" },
  { filename: "6_of_Swords_MeowsticTarot.png", name: "寶劍六", upright: "渡過難關 漸漸復原 旅行 尋求平靜 釋放壓力 轉變期", reversed: "停滯不前 困在過去 困難重重 拒絕前進 溝通障礙" },
  { filename: "7_of_Swords_MeowsticTarot.png", name: "寶劍七", upright: "欺騙 逃避 獨立行事 秘密 計謀 投機取巧 孤軍奮戰", reversed: "坦白 拆穿謊言 回歸正軌 計劃敗露 重新面對 勇敢" },
  { filename: "8_of_Swords_MeowsticTarot.png", name: "寶劍八", upright: "受困 孤立 限制 思想囚牢 盲目 束縛 焦慮 無助", reversed: "解脫 覺醒 自我解放 面對現實 突破限制 找到出路" },
  { filename: "9_of_Swords_MeowsticTarot.png", name: "寶劍九", upright: "焦慮 噩夢 擔憂 絕望 壓力 過度思考 失眠 自責", reversed: "釋放壓力 走出陰霾 尋求幫助 重建信心 逐漸康復" },
  { filename: "10_of_Swords_MeowsticTarot.png", name: "寶劍十", upright: "谷底 結束 毀滅 失敗 背叛 解脫 新生的起點", reversed: "置之死地而後生 掙扎 延遲的結束 復原期 害怕失敗" },
  { filename: "Page_of_Swords_MeowsticTarot.png", name: "寶劍侍從", upright: "警惕 好奇 訊息 敏銳 學習 理智 收集情報 溝通", reversed: "八卦 懷疑 敵意 缺乏準備 虛張聲勢 幼稚言行" },
  { filename: "Knight_of_Swords_MeowsticTarot.png", name: "寶劍騎士", upright: "急躁 理智 衝刺 衝突 勇往直前 挑戰 銳不可擋", reversed: "魯莽 橫衝直撞 衝突加劇 計劃失敗 脾氣暴躁 散漫" },
  { filename: "Queen_of_Swords_MeowsticTarot.png", name: "寶劍皇后", upright: "理智 獨立 誠實 敏銳 判斷力 邊界感 冷靜 智慧", reversed: "冷酷 刻刻薄 偏見 情緒化 過度批判 孤立自我" },
  { filename: "King_of_Swords_MeowsticTarot.png", name: "寶劍國王", upright: "權威 理性 智識 秩序 專業 法律 公正 決斷力", reversed: "專制 傲慢 濫用權力 殘忍 偏見 缺乏同理心" },

  // 金幣花色 (14張)
  { filename: "Ace_of_Pentacles_MeowsticTarot.png", name: "金幣首牌", upright: "新起點 豐盛 物質機會 繁榮 穩定 實用 財富", reversed: "失去機會 財務問題 浪費 物質匱乏 貪婪 延遲" },
  { filename: "2_of_Pentacles_MeowsticTarot.png", name: "金幣二", upright: "平衡 適應 變動 娛樂 多工處理 財務調度 靈活性", reversed: "失去平衡 壓力過大 財務混亂 缺乏適應力 盲目應付" },
  { filename: "3_of_Pentacles_MeowsticTarot.png", name: "金幣三", upright: "團隊合作 專業技能 建造 認可 協調 學習 穩健發展", reversed: "缺乏合作 技能不足 溝通障礙 品質粗糙 缺乏方向" },
  { filename: "4_of_Pentacles_MeowsticTarot.png", name: "金幣四", upright: "守財 控制 安全感 保守 固執 占有慾 物質保護", reversed: "浪費 失去控制 願意分享 財務危機 固執放手" },
  { filename: "5_of_Pentacles_MeowsticTarot.png", name: "金幣五", upright: "匱乏 困境 孤立 財務危機 疾病 尋求支持 邊緣化", reversed: "走出困境 財務改善 重獲支持 復原 找到庇護所" },
  { filename: "6_of_Pentacles_MeowsticTarot.png", name: "金幣六", upright: "慈善 給予與接受 分享 平衡 慷慨 互助 資源分配", reversed: "自私 債務糾紛 不平等分配 虛情假意 依賴他人" },
  { filename: "7_of_Pentacles_MeowsticTarot.png", name: "金幣七", upright: "評估 投資 等待 收穫 思考下一步 暫停 耐心", reversed: "缺乏耐心 投資失敗 徒勞無功 評估錯誤 停滯不前" },
  { filename: "8_of_Pentacles_MeowsticTarot.png", name: "金幣八", upright: "專注 磨練技能 勤奮 工作 完美主義 職人精神 學習", reversed: "粗心大意 厭倦工作 缺乏技能 走捷徑 完美主義受挫" },
  { filename: "9_of_Pentacles_MeowsticTarot.png", name: "金幣九", upright: "獨立 物質富足 享受 自足 優雅 成果 寧靜", reversed: "過度消費 失去獨立 財務危機 虛榮 孤寂 物質束縛" },
  { filename: "10_of_Pentacles_MeowsticTarot.png", name: "金幣十", upright: "家族 傳承 長期穩定 財富 繁榮 安全感 圓滿 成就", reversed: "家庭糾紛 財務損失 遺產問題 缺乏保障 短視近利" },
  { filename: "Page_of_Pentacles_MeowsticTarot.png", name: "金幣侍從", upright: "學習 實用 消息 機會 專注 物質計畫 開始積累", reversed: "缺乏目標 延遲 浪費 學習不專心 財務損失 幼稚" },
  { filename: "Knight_of_Pentacles_MeowsticTarot.png", name: "金幣騎士", upright: "穩健 耐心 責任感 勤奮 守信 保守 腳踏實地", reversed: "停滯 懶惰 頑固 缺乏活力 墨守成規 責任心缺失" },
  { filename: "Queen_of_Pentacles_MeowsticTarot.png", name: "金幣皇后", upright: "溫柔 慷慨 實用 安全感 母親般關懷 繁榮 物質管理", reversed: "自私 財務焦慮 過度保護 虛榮 缺乏安全感 浪費" },
  { filename: "King_of_Pentacles_MeowsticTarot.png", name: "金幣國王", upright: "成功 財務穩定 領導力 實用 商業頭腦 慷慨 掌控物質", reversed: "貪婪 專制 財務失敗 缺乏商業眼光 傲慢 守財奴" }
];
let selectedSpread = null; // 當前選擇的牌陣
let drawnCards = []; // 目前已抽取的卡牌與對應卡槽資訊
let isShuffled = false; // 是否已完成洗牌
let activeDeck = []; // 目前牌堆中的 78 張牌實體資料 (混淆並附帶正逆位資訊)

// 2. 八大牌陣位置與定義
const spreadsConfig = {
  "one-card": {
    title: "單牌占卜",
    slots: [
      { name: "今日運勢 / 核心啟示", x: 50, y: 50 }
    ]
  },
  "three-cards": {
    title: "聖三角牌陣",
    slots: [
      { name: "過去 (事情的起因與背景)", x: 25, y: 50 },
      { name: "現在 (當下的狀態與局勢)", x: 50, y: 50 },
      { name: "未來 (可能的發展與演變)", x: 75, y: 50 }
    ]
  },
  "gypsy-cross": {
    title: "吉普賽十字",
    slots: [
      { name: "你的現狀與心態", x: 25, y: 50 },
      { name: "對方的現狀與心態", x: 75, y: 50 },
      { name: "彼此的關係阻礙", x: 50, y: 22 },
      { name: "未來的關係發展", x: 50, y: 78 }
    ]
  },
  "two-options": {
    title: "二擇一牌陣",
    slots: [
      { name: "當前現狀", x: 50, y: 78 },
      { name: "選擇 A 的過程", x: 30, y: 45 },
      { name: "選擇 A 的結果", x: 25, y: 15 },
      { name: "選擇 B 的過程", x: 70, y: 45 },
      { name: "選擇 B 的結果", x: 75, y: 15 }
    ]
  },
  "cross": {
    title: "十字架牌陣",
    slots: [
      { name: "現狀與主要問題", x: 50, y: 50 },
      { name: "面臨的阻礙或挑戰", x: 25, y: 50 },
      { name: "你的目標與期望", x: 50, y: 18 },
      { name: "解決問題的對策", x: 75, y: 50 },
      { name: "最終可能的結果", x: 50, y: 82 }
    ]
  },
  "horseshoe": {
    title: "馬蹄鐵牌陣",
    slots: [
      { name: "過去的背景影響", x: 20, y: 72 },
      { name: "目前的現狀", x: 25, y: 38 },
      { name: "近未來的演變", x: 40, y: 18 },
      { name: "建議的行動對策", x: 60, y: 18 },
      { name: "周圍環境的阻礙", x: 75, y: 38 },
      { name: "最終發展結果", x: 80, y: 72 }
    ]
  },
  "hexagram": {
    title: "六芒星牌陣",
    slots: [
      { name: "過去的因素", x: 50, y: 18 },
      { name: "現在的局勢", x: 75, y: 68 },
      { name: "未來的期望", x: 25, y: 68 },
      { name: "對策與建議", x: 25, y: 35 },
      { name: "環境與他人影響", x: 75, y: 35 },
      { name: "你的潛意識意圖", x: 50, y: 85 },
      { name: "最終問題結論", x: 50, y: 51 }
    ]
  },
  "celtic-cross": {
    title: "凱爾特十字",
    slots: [
      { name: "位置 1：現狀與核心處境", x: 40, y: 50 },
      { name: "位置 2：遭遇的阻礙或助力", x: 42, y: 44 }, // 稍往右上方偏以顯示
      { name: "位置 3：目標與潛意識願望", x: 40, y: 15 },
      { name: "位置 4：根基與潛意識狀態", x: 40, y: 85 },
      { name: "位置 5：逝去的過去影響", x: 20, y: 50 },
      { name: "位置 6：即將到來的近未來", x: 60, y: 50 },
      { name: "位置 7：你目前的自我狀態", x: 80, y: 85 },
      { name: "位置 8：環境與周遭人影響", x: 80, y: 62 },
      { name: "位置 9：你的希望或恐懼", x: 80, y: 38 },
      { name: "位置 10：問題最終發展結果", x: 80, y: 15 }
    ]
  }
};

// 3. 初始化 DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  initStars();
  loadCardData();
  setupEventListeners();
  initAuth(); // 初始化帳戶登入與後台系統
});

// 星光閃爍背景效果
function initStars() {
  const starsContainer = document.querySelector(".stars-container");
  if (!starsContainer) return;
  // 隨機產生一些額外的動態微塵星光
  for (let i = 0; i < 40; i++) {
    const star = document.createElement("div");
    star.style.position = "absolute";
    star.style.width = Math.random() * 3 + "px";
    star.style.height = star.style.width;
    star.style.backgroundColor = "#fff";
    star.style.borderRadius = "50%";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.opacity = Math.random() * 0.7 + 0.3;
    star.style.animation = `starFlash ${Math.random() * 4 + 2}s infinite alternate`;
    starsContainer.appendChild(star);
  }

  // 插入動畫 CSS
  const style = document.createElement("style");
  style.textContent = `
    @keyframes starFlash {
      0% { opacity: 0.2; transform: scale(0.8); }
      100% { opacity: 1; transform: scale(1.2); }
    }
  `;
  document.head.appendChild(style);
}

// 4. 讀取並解析 detail.txt 牌意資料
async function loadCardData() {
  try {
    const response = await fetch("data/detail.txt");
    if (!response.ok) throw new Error("無法讀取牌義資料檔");
    const text = await response.text();
    
    // 按行解析
    allCards = text.trim().split("\n").map(line => {
      const parts = line.split(",");
      return {
        filename: parts[0],
        name: parts[1],
        upright: parts[2] ? parts[2].replace("正位：", "") : "",
        reversed: parts[3] ? parts[3].replace("逆位：", "") : ""
      };
    });
    console.log(`成功載入 ${allCards.length} 張塔羅牌。`);
  } catch (error) {
    console.warn("無法載入外部 detail.txt，已啟用內建備用牌意資料：", error);
  }
}

// 5. 事件監聽設定
function setupEventListeners() {
  // 選擇牌陣卡片
  const spreadCards = document.querySelectorAll(".spread-card");
  spreadCards.forEach(card => {
    card.addEventListener("click", () => {
      const spreadKey = card.getAttribute("data-spread");
      selectSpread(spreadKey);
    });
  });

  // 返回選單
  document.getElementById("btn-back-to-menu").addEventListener("click", () => {
    document.getElementById("tabletop-section").classList.add("hidden");
    document.getElementById("spread-selector-section").classList.remove("hidden");
  });

  // 重置桌布
  document.getElementById("btn-reset-table").addEventListener("click", () => {
    resetTable();
  });

  // 開始洗牌儀式
  document.getElementById("btn-shuffle").addEventListener("click", () => {
    startShufflingRitual();
  });

  // 自動發牌按鈕
  document.getElementById("btn-auto-deal").addEventListener("click", () => {
    autoDealCards();
  });

  // 關閉詳解彈窗
  document.getElementById("btn-close-modal").addEventListener("click", closeModal);
  document.getElementById("card-modal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("card-modal")) {
      closeModal();
    }
  });

  // 按 Esc 鍵關閉 Modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      closeAuthModal();
    }
  });

  // 帳戶登入與後台管理事件
  document.getElementById("btn-show-login").addEventListener("click", () => {
    openAuthModal();
  });
  
  document.getElementById("btn-close-auth-modal").addEventListener("click", () => {
    closeAuthModal();
  });
  
  document.getElementById("link-switch-auth").addEventListener("click", (e) => {
    e.preventDefault();
    switchAuthMode();
  });
  
  document.getElementById("auth-form").addEventListener("submit", (e) => {
    e.preventDefault();
    handleAuthSubmit();
  });
  
  document.getElementById("btn-logout").addEventListener("click", () => {
    handleLogout();
  });

  document.getElementById("btn-go-admin").addEventListener("click", () => {
    openAdminPanel();
  });

  document.getElementById("btn-close-admin").addEventListener("click", () => {
    closeAdminPanel();
  });

  // 後台 Tab 切換
  const tabButtons = document.querySelectorAll(".admin-tab-btn");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab");
      switchAdminTab(tabId);
    });
  });

  // 匯出 Excel (CSV)
  document.getElementById("btn-export-excel").addEventListener("click", () => {
    exportHistoryToExcel();
  });
}

// 6. 選擇牌陣與桌布初始化
function selectSpread(spreadKey) {
  selectedSpread = spreadsConfig[spreadKey];
  if (!selectedSpread) return;

  // 切換畫面
  document.getElementById("spread-selector-section").classList.add("hidden");
  document.getElementById("tabletop-section").classList.remove("hidden");

  // 更新 Header 資訊
  document.getElementById("current-spread-title").textContent = selectedSpread.title;
  updateCountBadge();

  // 重置狀態
  resetTable();
}

function updateCountBadge() {
  const badge = document.getElementById("current-spread-count-badge");
  if (selectedSpread) {
    badge.textContent = `${drawnCards.length} / ${selectedSpread.slots.length} 張`;
  }
}

// 7. 重置桌布
function resetTable() {
  drawnCards = [];
  isShuffled = false;
  updateCountBadge();

  // 顯示儀式按鈕，隱藏自動發牌
  document.getElementById("btn-shuffle").classList.remove("hidden");
  document.getElementById("btn-auto-deal").classList.add("hidden");

  // 更新提示語
  updatePrompt("請在心中默想你的問題，然後點擊「開始洗牌」進入儀式。");

  // 清空 DOM 容器
  const spreadContainer = document.getElementById("spread-layout-container");
  const deckContainer = document.getElementById("deck-container");
  spreadContainer.innerHTML = "";
  deckContainer.innerHTML = "";

  // 移除所有殘留在 tabletop 上的卡牌 DOM，避免新一局出現舊牌
  const tabletop = document.querySelector(".tabletop");
  if (tabletop) {
    const activeCards = tabletop.querySelectorAll(".tarot-card");
    activeCards.forEach(card => card.remove());
  }

  // 1. 生成牌陣卡槽 Slots
  selectedSpread.slots.forEach((slot, index) => {
    const slotEl = document.createElement("div");
    slotEl.classList.add("spread-slot");
    slotEl.style.left = `${slot.x}%`;
    slotEl.style.top = `${slot.y}%`;
    slotEl.setAttribute("data-index", index);

    // 卡槽內容
    slotEl.innerHTML = `
      <div class="slot-number">${index + 1}</div>
      <div class="slot-name">${slot.name}</div>
    `;

    // 凱爾特十字位置 2 (壓在位置 1 上面橫放) 特殊處理
    if (selectedSpread.title === "凱爾特十字" && index === 1) {
      slotEl.style.transform = "translate(-50%, -50%) rotate(90deg)";
    }

    spreadContainer.appendChild(slotEl);
  });

  // 2. 靜態生成 78 張堆疊在牌堆邊的背影卡 (給人尚未洗牌的感受)
  for (let i = 0; i < 40; i++) {
    const cardEl = document.createElement("div");
    cardEl.classList.add("tarot-card");
    cardEl.style.left = `calc(50% - 55px + ${i * 0.15}px)`;
    cardEl.style.top = `${20 - i * 0.2}px`;
    cardEl.style.zIndex = i;

    cardEl.innerHTML = `
      <div class="tarot-card-inner">
        <div class="tarot-card-back">
          <i class="fa-solid fa-cat"></i>
          <div class="back-pattern"></div>
        </div>
      </div>
    `;
    deckContainer.appendChild(cardEl);
  }
}

// 8. 開始洗牌儀式
function startShufflingRitual() {
  const btnShuffle = document.getElementById("btn-shuffle");
  btnShuffle.disabled = true;
  updatePrompt("🔮 正在洗牌，摒除雜念... 請深呼吸...");

  const deckContainer = document.getElementById("deck-container");
  deckContainer.innerHTML = ""; // 清空

  // 1. 生成 78 張帶隨機座標動畫的實體牌，準備播放洗牌動畫
  const tempCards = [];
  for (let i = 0; i < 40; i++) {
    const cardEl = document.createElement("div");
    cardEl.classList.add("tarot-card");
    cardEl.classList.add("shuffling");
    
    // 設定隨機運動的 CSS 變數
    cardEl.style.setProperty("--shuffle-x", `${(Math.random() - 0.5) * 160}px`);
    cardEl.style.setProperty("--shuffle-y", `${(Math.random() - 0.5) * 40}px`);
    cardEl.style.setProperty("--shuffle-r", `${(Math.random() - 0.5) * 45}deg`);
    
    cardEl.style.left = `calc(50% - 55px)`;
    cardEl.style.top = `20px`;
    cardEl.style.zIndex = i;

    cardEl.innerHTML = `
      <div class="tarot-card-inner">
        <div class="tarot-card-back">
          <i class="fa-solid fa-cat"></i>
          <div class="back-pattern"></div>
        </div>
      </div>
    `;
    deckContainer.appendChild(cardEl);
    tempCards.push(cardEl);
  }

  // 2. 播完動畫後 (2.5 秒) 的收攏與展開扇形邏輯
  setTimeout(() => {
    // 移除洗牌 class
    tempCards.forEach(c => c.classList.remove("shuffling"));
    
    // 產生打亂後的卡牌順序 (Fisher-Yates Shuffle)
    activeDeck = [...allCards];
    for (let i = activeDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [activeDeck[i], activeDeck[j]] = [activeDeck[j], activeDeck[i]];
    }

    // 為每張牌決定正位或逆位 (50% 機率)
    activeDeck = activeDeck.map(card => ({
      ...card,
      isReversed: Math.random() < 0.5
    }));

    // 展開成漂亮的扇形 (Fanning Effect)
    deckContainer.innerHTML = ""; // 清除洗牌臨時 DOM
    
    // 扇形僅展現 32 張供抽牌 (避免 78 張重疊太擠)
    const fanCount = 32;
    const angleRange = 60; // 扇形左右角度範圍

    for (let i = 0; i < fanCount; i++) {
      const cardEl = document.createElement("div");
      cardEl.classList.add("tarot-card");
      
      // 計算扇形角度與位移
      const percent = i / (fanCount - 1);
      const angle = -angleRange / 2 + percent * angleRange;
      const xOffset = (percent - 0.5) * 580; // 左右拉開
      const yOffset = Math.sin(percent * Math.PI) * -35; // 形成弧形拱起

      cardEl.style.left = `calc(50% - 55px + ${xOffset}px)`;
      cardEl.style.top = `${50 + yOffset}px`;
      cardEl.style.transform = `rotate(${angle}deg)`;
      cardEl.style.zIndex = i + 10;
      cardEl.setAttribute("data-deck-index", i); // 綁定對應抽取的牌資料

      cardEl.innerHTML = `
        <div class="tarot-card-inner">
          <div class="tarot-card-back">
            <i class="fa-solid fa-cat"></i>
            <div class="back-pattern"></div>
          </div>
        </div>
      `;

      // 綁定點選抽取事件
      cardEl.addEventListener("click", () => {
        drawCard(cardEl, i);
      });

      deckContainer.appendChild(cardEl);
    }

    isShuffled = true;
    btnShuffle.classList.add("hidden");
    btnShuffle.disabled = false;
    document.getElementById("btn-auto-deal").classList.remove("hidden");
    updatePrompt(`✨ 洗牌完成！請依序點選扇形牌堆，抽取 ${selectedSpread.slots.length} 張牌。`);
  }, 2500);
}

// 9. 抽取一張卡牌邏輯
function drawCard(cardEl, fanIndex) {
  if (!isShuffled) return;
  if (drawnCards.length >= selectedSpread.slots.length) {
    updatePrompt("牌陣已抽滿，點選牌陣上的卡牌即可解讀牌意！");
    return;
  }

  // 取得當前要放入的 Slot 索引
  const targetSlotIndex = drawnCards.length;
  const targetSlot = document.querySelector(`.spread-slot[data-index="${targetSlotIndex}"]`);
  
  if (!targetSlot) return;

  // 1. 取得這張牌分配到的塔羅牌義資料
  const cardData = activeDeck[fanIndex];
  
  // 2. 複製該卡牌節點，藉此清除原本的點選抽取 Event Listener
  const newCardEl = cardEl.cloneNode(true);
  
  // 在 DOM 中替換舊節點
  cardEl.parentNode.replaceChild(newCardEl, cardEl);

  // 記錄到已抽卡片陣列
  drawnCards.push({
    data: cardData,
    slotName: selectedSpread.slots[targetSlotIndex].name,
    isReversed: cardData.isReversed,
    element: newCardEl
  });

  // 更新右上角計數
  updateCountBadge();

  // 3. 準備發牌飛躍動畫
  // 取得相對定位基準父元素 (.tabletop) 及其它元素的位置
  const tabletop = document.querySelector(".tabletop");
  const tabletopRect = tabletop.getBoundingClientRect();
  const cardRect = newCardEl.getBoundingClientRect();
  const slotRect = targetSlot.getBoundingClientRect();

  // 計算卡牌當前相對於 tabletop 的座標
  const currentLeft = cardRect.left - tabletopRect.left;
  const currentTop = cardRect.top - tabletopRect.top;

  // 計算目標 Slot 相對於 tabletop 的座標
  const targetLeft = slotRect.left - tabletopRect.left;
  const targetTop = slotRect.top - tabletopRect.top;

  // 將 DOM 父層級轉移到 tabletop，並維持在原位 (包含原本扇形的 rotate transform)
  newCardEl.style.pointerEvents = "none"; // 飛行過程中禁止點擊
  const originalTransform = newCardEl.style.transform;
  tabletop.appendChild(newCardEl);

  newCardEl.style.left = `${currentLeft}px`;
  newCardEl.style.top = `${currentTop}px`;
  newCardEl.style.transform = originalTransform;

  // 4. 動態播放飛躍與對齊插槽的 transition 動畫 (延遲設定觸發重繪)
  setTimeout(() => {
    newCardEl.style.transform = "none";
    
    // 凱爾特十字位置 2 需旋轉 90 度橫放
    if (selectedSpread.title === "凱爾特十字" && targetSlotIndex === 1) {
      newCardEl.style.transform = "rotate(90deg)";
    }

    newCardEl.style.left = `${targetLeft}px`;
    newCardEl.style.top = `${targetTop}px`;
    newCardEl.style.zIndex = 100 + targetSlotIndex;
  }, 50);

  // 5. 替換為正面的 3D 架構 (此時仍為背面朝上)
  const innerEl = newCardEl.querySelector(".tarot-card-inner");
  const frontEl = document.createElement("div");
  frontEl.classList.add("tarot-card-front");
  if (cardData.isReversed) {
    frontEl.classList.add("reversed");
  }

  // 載入對應 images 資料夾下的圖片
  const imgUrl = `images/${cardData.filename}`;
  frontEl.innerHTML = `<img src="${imgUrl}" alt="${cardData.name}">`;
  innerEl.appendChild(frontEl);

  // 讓卡槽高亮顯示已放入
  targetSlot.classList.add("active");

  // 建立位置 label，常駐於卡牌正下方以清晰顯示牌陣意思
  const labelEl = document.createElement("div");
  labelEl.classList.add("card-slot-label");
  
  // 清理 Slot 名字，去除括號註解與前置指示以求精簡高雅
  const rawName = selectedSpread.slots[targetSlotIndex].name;
  let cleanName = rawName.split("(")[0].split("（")[0].trim();
  if (cleanName.includes("：")) {
    cleanName = cleanName.split("：")[1].trim();
  } else if (cleanName.includes(":")) {
    cleanName = cleanName.split(":")[1].trim();
  }
  
  labelEl.textContent = cleanName;
  newCardEl.appendChild(labelEl);

  // 6. 卡片飛入定位後 (650ms) 啟用點擊事件，進行 3D 翻轉翻牌或打開 Lightbox
  setTimeout(() => {
    newCardEl.style.pointerEvents = "auto";
    newCardEl.addEventListener("click", () => {
      if (!newCardEl.classList.contains("flipped")) {
        newCardEl.classList.add("flipped");
        updatePrompt(`點選已翻開的「${cardData.name}」可查看詳細解牌義。`);
        
        // 檢測是否所有抽取的卡牌皆已翻開
        const totalSlots = selectedSpread.slots.length;
        const flippedCardsCount = document.querySelectorAll(".tabletop .tarot-card.flipped").length;
        if (flippedCardsCount === totalSlots) {
          saveDivinationRecord(); // 自動將占卜歷史儲存至 LocalStorage
        }
      } else {
        openCardDetail(cardData, targetSlotIndex);
      }
    });
  }, 650);

  // 更新下一步提示
  if (drawnCards.length < selectedSpread.slots.length) {
    updatePrompt(`已抽 ${drawnCards.length} 張。請繼續抽取下一張。`);
  } else {
    updatePrompt("🎉 抽牌完成！點擊牌陣中的卡牌進行翻牌，再次點擊即可看大圖與解牌義。");
    document.getElementById("btn-auto-deal").classList.add("hidden");
  }
}

// 10. 自動發牌
function autoDealCards() {
  if (!isShuffled) return;
  const needed = selectedSpread.slots.length - drawnCards.length;
  if (needed <= 0) return;

  let count = 0;
  function dealNext() {
    if (drawnCards.length < selectedSpread.slots.length) {
      // 隨機選一個尚未被抽取的 DOM 牌
      const availableCards = Array.from(document.querySelectorAll(".deck-container .tarot-card:not(.flipped)"))
                                  .filter(el => !drawnCards.some(d => d.element === el));
      if (availableCards.length > 0) {
        const randIndex = Math.floor(Math.random() * availableCards.length);
        const cardEl = availableCards[randIndex];
        const deckIndex = parseInt(cardEl.getAttribute("data-deck-index"));
        
        drawCard(cardEl, deckIndex);
        
        // 延遲一段時間再發下一張，模擬動畫感
        count++;
        setTimeout(dealNext, 450);
      }
    }
  }
  dealNext();
}

// 11. 彈出解牌 Lightbox (Modal)
function openCardDetail(cardData, slotIndex) {
  const modal = document.getElementById("card-modal");
  const modalImg = document.getElementById("modal-card-img");
  const modalFrame = document.getElementById("modal-card-frame");
  const positionText = document.getElementById("modal-card-position-text");
  const titleText = document.getElementById("modal-card-title");
  const orientBadge = document.getElementById("modal-card-orientation");
  const descText = document.getElementById("modal-card-description");

  // 設定卡片基本資訊
  modalImg.src = `images/${cardData.filename}`;
  positionText.textContent = `${selectedSpread.slots[slotIndex].name}`;
  titleText.textContent = `${cardData.name} (${cardData.filename.replace("_MeowsticTarot.png", "").replace(/_/g, " ")})`;

  // 設定正逆位
  const isReversed = cardData.isReversed;
  if (isReversed) {
    orientBadge.textContent = "逆位 (Reversed)";
    orientBadge.className = "orientation-badge reversed";
    modalFrame.style.transform = "rotate(180deg)"; // 讓 Modal 中的卡牌圖案也倒過來
    descText.textContent = cardData.reversed || "暫無逆位牌意說明。";
  } else {
    orientBadge.textContent = "正位 (Upright)";
    orientBadge.className = "orientation-badge upright";
    modalFrame.style.transform = "none";
    descText.textContent = cardData.upright || "暫無正位牌意說明。";
  }

  // 顯示 Modal
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden"; // 避免底層滾動
}

// 關閉 Modal
function closeModal() {
  const modal = document.getElementById("card-modal");
  modal.classList.add("hidden");
  document.body.style.overflow = ""; // 恢復滾動
}

// 12. 輔助函式
function updatePrompt(text) {
  document.getElementById("mystical-status-text").innerHTML = text;
}

function showNotification(title, text) {
  alert(`${title}\n${text}`);
}

// --------------------------------------------------
// 13. 帳戶登入與管理後台核心邏輯
// --------------------------------------------------
let currentUser = null; // 當前登入的用戶資訊
let isRegisterMode = false; // 是否處於註冊模式

// 初始化帳戶與歷史紀錄資料庫
function initAuth() {
  // 1. 初始化使用者列表
  if (!localStorage.getItem("tarot_users")) {
    const defaultUsers = [
      { username: "admin", password: "admin123", role: "admin" }
    ];
    localStorage.setItem("tarot_users", JSON.stringify(defaultUsers));
  }

  // 2. 初始化歷史紀錄列表
  if (!localStorage.getItem("tarot_history")) {
    localStorage.setItem("tarot_history", JSON.stringify([]));
  }

  // 3. 讀取 Session 登入狀態
  const savedUser = sessionStorage.getItem("tarot_current_user");
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
  }

  updateAuthUI();
}

// 開啟登入彈窗
function openAuthModal() {
  isRegisterMode = false;
  document.getElementById("auth-modal-title").textContent = "登入占卜帳戶";
  document.getElementById("btn-auth-submit").textContent = "立即登入";
  document.getElementById("auth-switch-text").textContent = "還沒有帳戶？";
  document.getElementById("link-switch-auth").textContent = "立即註冊";
  document.getElementById("auth-form").reset();
  
  document.getElementById("login-modal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

// 關閉登入彈窗
function closeAuthModal() {
  document.getElementById("login-modal").classList.add("hidden");
  if (!document.getElementById("card-modal").classList.contains("hidden")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

// 切換登入與註冊模式
function switchAuthMode() {
  isRegisterMode = !isRegisterMode;
  const title = document.getElementById("auth-modal-title");
  const submitBtn = document.getElementById("btn-auth-submit");
  const switchText = document.getElementById("auth-switch-text");
  const switchLink = document.getElementById("link-switch-auth");

  if (isRegisterMode) {
    title.textContent = "註冊占卜帳戶";
    submitBtn.textContent = "立即註冊";
    switchText.textContent = "已有帳戶？";
    switchLink.textContent = "立即登入";
  } else {
    title.textContent = "登入占卜帳戶";
    submitBtn.textContent = "立即登入";
    switchText.textContent = "還沒有帳戶？";
    switchLink.textContent = "立即註冊";
  }
}

// 處理登入/註冊提交
function handleAuthSubmit() {
  const usernameInput = document.getElementById("auth-username").value.trim();
  const passwordInput = document.getElementById("auth-password").value.trim();

  if (!usernameInput || !passwordInput) {
    showNotification("提示", "請填寫帳號與密碼。");
    return;
  }

  const users = JSON.parse(localStorage.getItem("tarot_users")) || [];

  if (isRegisterMode) {
    // 註冊邏輯
    const exists = users.some(u => u.username.toLowerCase() === usernameInput.toLowerCase());
    if (exists) {
      showNotification("註冊失敗", "該用戶名稱已被使用。");
      return;
    }

    // 建立新用戶 (預設為普通用戶 role: 'user')
    const newUser = {
      username: usernameInput,
      password: passwordInput,
      role: "user"
    };

    users.push(newUser);
    localStorage.setItem("tarot_users", JSON.stringify(users));

    // 註冊後自動登入
    currentUser = { username: newUser.username, role: newUser.role };
    sessionStorage.setItem("tarot_current_user", JSON.stringify(currentUser));
    
    showNotification("註冊成功", `帳號 ${newUser.username} 註冊成功並已自動登入！`);
    closeAuthModal();
    updateAuthUI();
  } else {
    // 登入邏輯
    const matchedUser = users.find(u => u.username === usernameInput && u.password === passwordInput);
    if (!matchedUser) {
      showNotification("登入失敗", "帳號或密碼錯誤，請重新確認。");
      return;
    }

    currentUser = { username: matchedUser.username, role: matchedUser.role };
    sessionStorage.setItem("tarot_current_user", JSON.stringify(currentUser));

    showNotification("登入成功", `歡迎回來，${currentUser.username}！`);
    closeAuthModal();
    updateAuthUI();
  }
}

// 處理登出
function handleLogout() {
  sessionStorage.removeItem("tarot_current_user");
  currentUser = null;
  showNotification("已登出", "你已成功安全登出帳戶。");
  updateAuthUI();
  closeAdminPanel();
}

// 更新用戶登入狀態 UI
function updateAuthUI() {
  const welcomeText = document.getElementById("user-welcome-text");
  const btnShowLogin = document.getElementById("btn-show-login");
  const btnGoAdmin = document.getElementById("btn-go-admin");
  const btnLogout = document.getElementById("btn-logout");

  if (currentUser) {
    welcomeText.innerHTML = `<i class="fa-solid fa-cat"></i> ${currentUser.username}`;
    btnShowLogin.classList.add("hidden");
    btnLogout.classList.remove("hidden");
    
    if (currentUser.role === "admin") {
      btnGoAdmin.classList.remove("hidden");
    } else {
      btnGoAdmin.classList.add("hidden");
    }
  } else {
    welcomeText.innerHTML = `<i class="fa-solid fa-user-ninja"></i> 訪客`;
    btnShowLogin.classList.remove("hidden");
    btnGoAdmin.classList.add("hidden");
    btnLogout.classList.add("hidden");
  }
}

// 開啟管理後台
function openAdminPanel() {
  if (!currentUser || currentUser.role !== "admin") return;

  // 隱藏占卜桌面與選單區
  document.getElementById("spread-selector-section").classList.add("hidden");
  document.getElementById("tabletop-section").classList.add("hidden");
  
  // 顯示後台區
  document.getElementById("admin-panel-section").classList.remove("hidden");

  // 預設切換至使用者列表 tab
  switchAdminTab("users-tab");
}

// 關閉管理後台，返回主選單
function closeAdminPanel() {
  document.getElementById("admin-panel-section").classList.add("hidden");
  document.getElementById("spread-selector-section").classList.remove("hidden");
}

// 後台 Tabs 分頁切換
function switchAdminTab(tabId) {
  // 切換 Button 狀態
  const tabButtons = document.querySelectorAll(".admin-tab-btn");
  tabButtons.forEach(btn => {
    if (btn.getAttribute("data-tab") === tabId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // 切換內容顯示
  const tabContents = document.querySelectorAll(".admin-tab-content");
  tabContents.forEach(content => {
    if (content.id === tabId) {
      content.classList.remove("hidden");
    } else {
      content.classList.add("hidden");
    }
  });

  // 載入數據
  if (tabId === "users-tab") {
    renderAdminUsers();
  } else if (tabId === "history-tab") {
    renderAdminHistory();
  }
}

// 渲染管理後台使用者列表
function renderAdminUsers() {
  const users = JSON.parse(localStorage.getItem("tarot_users")) || [];
  const tbody = document.getElementById("admin-users-table-body");
  tbody.innerHTML = "";

  users.forEach(user => {
    const tr = document.createElement("tr");

    // 判斷是否為當前登入者本人 (不可自刪、不可自降權限)
    const isSelf = currentUser && currentUser.username === user.username;
    
    // 生成操作欄
    const actionButtons = isSelf 
      ? `<span class="role-badge admin" style="opacity:0.6;">(當前登入帳戶)</span>` 
      : `<button class="btn-action-edit" onclick="changeUserRole('${user.username}')"><i class="fa-solid fa-user-shield"></i> 切換權限</button>
         <button class="btn-action-delete" onclick="deleteUser('${user.username}')"><i class="fa-solid fa-user-minus"></i> 刪除</button>`;

    tr.innerHTML = `
      <td><strong>${user.username}</strong></td>
      <td><span class="role-badge ${user.role}">${user.role === 'admin' ? '管理員 (Admin)' : '普通用戶 (User)'}</span></td>
      <td>${actionButtons}</td>
    `;
    tbody.appendChild(tr);
  });
}

// 修改用戶權限角色
function changeUserRole(username) {
  const users = JSON.parse(localStorage.getItem("tarot_users")) || [];
  const user = users.find(u => u.username === username);
  if (user) {
    user.role = user.role === "admin" ? "user" : "admin";
    localStorage.setItem("tarot_users", JSON.stringify(users));
    renderAdminUsers();
  }
}

// 刪除用戶
function deleteUser(username) {
  if (confirm(`確定要徹底刪除用戶帳戶「${username}」嗎？此操作不可復原。`)) {
    let users = JSON.parse(localStorage.getItem("tarot_users")) || [];
    users = users.filter(u => u.username !== username);
    localStorage.setItem("tarot_users", JSON.stringify(users));
    renderAdminUsers();
  }
}

// 自動將本次占卜結果儲存至歷史紀錄中
function saveDivinationRecord() {
  const history = JSON.parse(localStorage.getItem("tarot_history")) || [];
  
  // 1. 取得當前時間
  const now = new Date();
  const dateStr = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')} ` +
                  `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

  // 2. 彙整抽卡詳細資料與位置定義
  const cardsInfo = drawnCards.map((card, idx) => {
    // 簡化卡槽名稱
    const rawSlotName = selectedSpread.slots[idx].name;
    let cleanSlot = rawSlotName.split("(")[0].split("（")[0].trim();
    if (cleanSlot.includes("：")) cleanSlot = cleanSlot.split("：")[1].trim();
    if (cleanSlot.includes(":")) cleanSlot = cleanSlot.split(":")[1].trim();

    return `[${cleanSlot}] ${card.data.name} (${card.isReversed ? '逆位' : '正位'})`;
  }).join(" | ");

  // 3. 建立一筆歷史紀錄
  const record = {
    id: Date.now(),
    username: currentUser ? currentUser.username : "訪客",
    dateTime: dateStr,
    spreadName: selectedSpread.title,
    cardsInfo: cardsInfo
  };

  history.unshift(record); // 最新紀錄排在前面
  localStorage.setItem("tarot_history", JSON.stringify(history));

  console.log("占卜紀錄已自動儲存：", record);
  updatePrompt("🔮 占卜完成！本局歷史紀錄已自動存入後台資料庫。");
}

// 渲染管理後台占卜歷史紀錄
function renderAdminHistory() {
  const history = JSON.parse(localStorage.getItem("tarot_history")) || [];
  const tbody = document.getElementById("admin-history-table-body");
  tbody.innerHTML = "";

  if (history.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-secondary);">目前尚無任何占卜歷史歷史紀錄。</td></tr>`;
    return;
  }

  history.forEach(record => {
    const tr = document.createElement("tr");

    // 將卡牌清單中 "|" 隔開的字串轉換成格式化小標籤
    const formattedCards = record.cardsInfo.split(" | ").map(c => {
      const parts = c.split("] ");
      const slot = parts[0].replace("[", "");
      const card = parts[1];
      return `<span class="history-cards-info"><strong>${slot}</strong>: ${card}</span>`;
    }).join("<br>");

    tr.innerHTML = `
      <td>${record.dateTime}</td>
      <td><strong>${record.username}</strong></td>
      <td><span class="role-badge user">${record.spreadName}</span></td>
      <td><div style="text-align:left; font-size:0.85rem; line-height:1.4;">${formattedCards}</div></td>
      <td><button class="btn-action-delete" onclick="deleteHistoryRecord(${record.id})"><i class="fa-solid fa-trash-can"></i> 刪除</button></td>
    `;
    tbody.appendChild(tr);
  });
}

// 刪除占卜歷史紀錄
function deleteHistoryRecord(recordId) {
  if (confirm("確定要刪除這筆占卜歷史歷史紀錄嗎？")) {
    let history = JSON.parse(localStorage.getItem("tarot_history")) || [];
    history = history.filter(r => r.id !== recordId);
    localStorage.setItem("tarot_history", JSON.stringify(history));
    renderAdminHistory();
  }
}

// 匯出歷史紀錄為 Excel 相容的 CSV 檔案 (具備 UTF-8 BOM，Excel 直接開不亂碼)
function exportHistoryToExcel() {
  const history = JSON.parse(localStorage.getItem("tarot_history")) || [];
  if (history.length === 0) {
    showNotification("提示", "目前尚無任何數據可供匯出。");
    return;
  }

  // 1. 定義 CSV 標頭
  let csvContent = "占卜時間,抽牌使用者,使用牌陣,抽出的牌卡與位置定義\r\n";

  // 2. 填充資料行 (CSV 需要處理逗號換行雙引號)
  history.forEach(r => {
    // 對卡牌字串進行 escape 以防 CSV 崩壞
    const escapedCardsInfo = `"${r.cardsInfo.replace(/"/g, '""')}"`;
    const row = `${r.dateTime},${r.username},${r.spreadName},${escapedCardsInfo}\r\n`;
    csvContent += row;
  });

  // 3. 建立並下載檔案 (添加 \ufeff 作為 UTF-8 BOM 避免微軟 Excel 中文亂碼)
  const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.setAttribute("href", url);
  
  const now = new Date();
  const dateSuffix = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  link.setAttribute("download", `tarotcat_history_${dateSuffix}.csv`);
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  console.log("占卜歷史歷史紀錄成功導出 Excel CSV！");
}

