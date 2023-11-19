export const colors = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(89, 89, 230, 0.5)",
    "rgba(43, 171, 171,0.5)",
    "rgba(140, 77, 21, 0.5)",
    "rgba(139, 195, 74, 0.5)",
    "rgba(96, 125, 139, 0.5)",
    "	rgba(0, 150, 13, 0.5)",
]

export const days = ["Mon", "Tues", "Wed", "Thus", "Fri", "Sat"]

export const extractDates = (data=[])=>{
    const dates = []
    data.forEach(x=>{
        const date = new Date(x["date"])
        dates.push(`${days[date.getDay() - 1]} ${date.getDay()}/${date.getMonth()}`)
    })
    return dates.reverse()
}

export const extractOpen = (data=[])=>{
    const open = []
    data.forEach(x=>open.push(x["open"]))
    return open
}