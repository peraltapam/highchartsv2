export interface Chart {
  success: boolean,
  errors: [],
  segment_id: number,
  "start_date": string,
  "end_date": string,
  metrics:{
    revenue_by_medium:{
      title: string,
      description: string,
      health: number,
      legend: string,
      difference: string,
      categories: string,
      data:{
        value: string,
        series:[
          {
            name: string,
            type: number,
            value: string,
            data:{
              affiliates: number,
              email: number,
              organic: number,
              other: number,
              "paid search": number,
              referral: number,
              retargeting: number,
              social: number,
              "social paid": number
            }
          }
        ]
      }
    }
  }
}