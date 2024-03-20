
import randomColor  from 'randomcolor'


export function createAvatarRandomColors(): string[] {

    const colors = randomColor({
        count: 2,
        luminosity: 'dark',
        format: 'hex'
    })

    colors.push('#ffffff')

    console.log(colors)
    
    return colors

}
