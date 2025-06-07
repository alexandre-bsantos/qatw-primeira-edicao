import pgPromise from 'pg-promise'

const pgp = pgPromise()
const db = pgp('postgresql://dba:dba@paybank-db:5432/UserDB')

export async function obterCodigo2FA(cpf) {

    const query = `
        SELECT t.code
        FROM public."TwoFactorCode" t
		join public."User" u on t."userId" = u."id"
		where u."cpf" = '${cpf}'
        order by t.id desc
        limit 1;
    `

    const result = await db.oneOrNone(query)

    return result.code
}