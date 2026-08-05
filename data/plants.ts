export interface Plant {
  id: string;
  name: string;
  location: string;
  moisture: string;
  dryDays: number;
  lastWaterDate: string | null;
  previousWaterDate: string | null;
  notes: string;
}

export const plants: Plant[] = [
  {
    id: "P001",
    name: "龟背竹skullpanda",
    location: "北屋书房",
    moisture: "蓝区",
    dryDays: 7,
    lastWaterDate: null,
    notes: "指针偏红立刻补水",
    previousWaterDate: null,
  },
  {
    id: "P002",
    name: "秋海棠唐米勒",
    location: "北屋书房",
    moisture: "蓝区",
    dryDays: 5,
    lastWaterDate: null,
    notes: "叶面怕积水，指针偏红立刻补水",
    previousWaterDate: null,
  },
  {
    id: "P003",
    name: "天鹅绒海芋",
    location: "北屋书房",
    moisture: "蓝区",
    dryDays: 5,
    lastWaterDate: null,
    notes: "指针偏红立刻补水",
    previousWaterDate: null,
  },
  {
    id: "P004",
    name: "蓝雪花",
    location: "南阳台",
    moisture: "蓝区",
    dryDays: 3,
    lastWaterDate: null,
    notes: "红区边缘立刻浇透",
    previousWaterDate: null,
  },
  {
    id: "P005",
    name: "三角梅绿叶樱花",
    location: "南阳台",
    moisture: "绿区",
    dryDays: 4,
    lastWaterDate: null,
    notes: "不进红区不浇水",
    previousWaterDate: null,
  },
  {
    id: "P006",
    name: "香水柠檬",
    location: "南阳台",
    moisture: "红区",
    dryDays: 5,
    lastWaterDate: "2026-08-02",
    notes: "红区边缘立刻浇透，需通风",
    previousWaterDate: null,
  },
  {
    id: "P007",
    name: "长寿花维罗纳",
    location: "南阳台",
    moisture: "绿区",
    dryDays: 5,
    lastWaterDate: null,
    notes: "宁干勿湿，不进红区不浇水",
    previousWaterDate: null,
  },
  {
    id: "P008",
    name: "大飞羽竹芋",
    location: "北屋窗台",
    moisture: "绿区",
    dryDays: 7,
    lastWaterDate: "2026-08-02",
    notes: "喜高湿度，忌强光暴晒",
    previousWaterDate: null,
  },
  {
    id: "P009",
    name: "龟背竹柠檬labubu",
    location: "北屋书房",
    moisture: "蓝区",
    dryDays: 7,
    lastWaterDate: null,
    notes: "指针偏红立刻补水",
    previousWaterDate: null,
  },
  {
    id: "P010",
    name: "龟背竹夏威夷labubu",
    location: "北屋书房",
    moisture: "蓝区",
    dryDays: 7,
    lastWaterDate: null,
    notes: "指针偏红立刻补水",
    previousWaterDate: null,
  },
];