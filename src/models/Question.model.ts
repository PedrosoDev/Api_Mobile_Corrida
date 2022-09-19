import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  // TODO: Perguntar qual é o tipo da propriedade.
  @Column()
  difficulty!: "Easy" | "Normal" | "Hard";
  
  // TODO: Perguntar qual é o tipo da propriedade.
  @Column()
  type!: string

  @Column()
  
}
