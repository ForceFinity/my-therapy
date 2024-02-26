export default function getAge(birthDate: Date): number {
    const ageDifMs = Date.now() - birthDate.getTime()
    const ageDate = new Date(ageDifMs)

    return Math.abs(ageDate.getUTCFullYear() - 1970)
}