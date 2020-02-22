import {Entity, PrimaryKey, Property, MongoEntity, SerializedPrimaryKey, Unique} from 'mikro-orm';
import {ObjectID} from 'mongo';
import {IsEmail, IsMobilePhone} from 'class-validator';
import {DeepPartial} from '@libs/common/shared/shared-types';
import {BaseEntity} from '@libs/db/entities/base.entity';

@Entity()
@Unique({properties: [ 'name', 'email' ]})
export class User extends BaseEntity {
    // constructor(input?: DeepPartial<User>) {
    //   if (input) {
    //     for (const [ key, value ] of Object.entries(input)) {
    //       (this as any)[key] = value;
    //     }
    //   }
    // }

    // @PrimaryKey()
    // _id!: ObjectID;
    //
    // @SerializedPrimaryKey()
    // id!: string;
    //
    // @Property()
    // createdAt: Date = new Date();
    //
    // @Property({onUpdate: () => new Date()})
    // updatedAt: Date;

    // @Property({version: true, default: 1})
    // version!: number;
    //
    @Property({
        unique: true,
        type: 'string',
    })
    @Unique()
    name: string;

    @Property()
    displayName: string;
    @Property()
    passwordHash: string;
    @IsMobilePhone('zh-CN', {message: '手机号错误？'})
    @Property()
    phone?: string;
    @IsEmail({}, {message: '📮邮箱格式错误？'})
    @Property()
    email?: string;
    @Property()
    verified?: boolean;
    @Property()
    verificationToken?: string | null;
    /**
     * @description
     * 用于更新用户标识的令牌,通常是一个邮件地址
     */
    @Property()
    identifierChangeToken?: string | null;
}
