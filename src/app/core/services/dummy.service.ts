import { Injectable } from '@angular/core';
import { Document } from '@shared/interfaces/document';

@Injectable({
  providedIn: 'root'
}) 
export class DummyService {

  // cards = Array.from({ length: 26 }, (_, i) => ({ id: i + 1 })); // Exemplo de 30 cards
  
  documents: Document[] = [{
    'id': 1,
    'name': 'Street Population.xlsx',
    'date': '25 de August de 2023',
    'time': '19:16 Minutos',
    'ext': '.docx',
    'size': 1632,
    'subject': 'West civil window.',
    'type': 'Nota',
    'user': 'Margaret Patel',
    'area': 'Marketing'
  },
  {
    'id': 2,
    'name': 'Parent Industry.docx',
    'date': '31 de March de 2023',
    'time': '22:45 Minutos',
    'ext': '.xlsx',
    'size': 2333,
    'subject': 'Line yourself strong lose.',
    'type': 'Resumo',
    'user': 'Christopher Ferguson',
    'area': 'Marketing'
  },
  {
    'id': 3,
    'name': 'Sort Budget.pptx',
    'date': '21 de December de 2024',
    'time': '23:49 Minutos',
    'ext': '.pptx',
    'size': 1928,
    'subject': 'Business might.',
    'type': 'Nota',
    'user': 'Deanna Torres',
    'area': 'R.S.I'
  },
  {
    'id': 4,
    'name': 'Herself Argue.xlsx',
    'date': '05 de August de 2023',
    'time': '01:26 Minutos',
    'ext': '.docx',
    'size': 2822,
    'subject': 'Deal produce.',
    'type': 'Artigo',
    'user': 'Brittany Rodriguez',
    'area': 'R.S.I'
  },
  {
    'id': 5,
    'name': 'Pick Serious.docx',
    'date': '09 de June de 2024',
    'time': '07:32 Minutos',
    'ext': '.docx',
    'size': 4406,
    'subject': 'Attorney there.',
    'type': 'Relatório',
    'user': 'Richard Silva',
    'area': 'Marketing'
  },
  {
    'id': 6,
    'name': 'Idea Plant.xlsx',
    'date': '17 de December de 2024',
    'time': '08:27 Minutos',
    'ext': '.pptx',
    'size': 3602,
    'subject': 'Public yeah challenge.',
    'type': 'Boletim',
    'user': 'Brent Anderson',
    'area': 'Marketing'
  },
  {
    'id': 7,
    'name': 'Business How.docx',
    'date': '05 de May de 2024',
    'time': '03:29 Minutos',
    'ext': '.pptx',
    'size': 4958,
    'subject': 'Draw company especially.',
    'type': 'Boletim',
    'user': 'Sarah King DVM',
    'area': 'Financeiro'
  },
  {
    'id': 8,
    'name': 'Design Two.pdf',
    'date': '10 de September de 2024',
    'time': '04:23 Minutos',
    'ext': '.docx',
    'size': 3427,
    'subject': 'Adult huge.',
    'type': 'Boletim',
    'user': 'Michael Ward',
    'area': 'R.S.I'
  },
  {
    'id': 9,
    'name': 'Everyone Relate.pdf',
    'date': '08 de June de 2023',
    'time': '11:56 Minutos',
    'ext': '.docx',
    'size': 2939,
    'subject': 'Subject forward if.',
    'type': 'Relatório',
    'user': 'Holly Peterson',
    'area': 'TI'
  },
  {
    'id': 10,
    'name': 'Himself East.txt',
    'date': '28 de February de 2023',
    'time': '22:53 Minutos',
    'ext': '.pptx',
    'size': 3148,
    'subject': 'Quickly seek.',
    'type': 'Resumo',
    'user': 'Hayley Lee',
    'area': 'R.S.I'
  },
  {
    'id': 11,
    'name': 'Project Series.txt',
    'date': '30 de March de 2024',
    'time': '19:20 Minutos',
    'ext': '.txt',
    'size': 2887,
    'subject': 'Determine sell however.',
    'type': 'Resumo',
    'user': 'Rebecca Flores',
    'area': 'R.S.I'
  },
  {
    'id': 12,
    'name': 'Society Choice.pdf',
    'date': '16 de November de 2023',
    'time': '04:02 Minutos',
    'ext': '.docx',
    'size': 1197,
    'subject': 'Several school.',
    'type': 'Resumo',
    'user': 'Nancy Taylor',
    'area': 'Financeiro'
  },
  {
    'id': 13,
    'name': 'Recognize Evidence.txt',
    'date': '06 de July de 2024',
    'time': '23:17 Minutos',
    'ext': '.xlsx',
    'size': 3808,
    'subject': 'Explain blood style partner.',
    'type': 'Boletim',
    'user': 'Jason Boone II',
    'area': 'R.S.I'
  },
  {
    'id': 14,
    'name': 'Hour Business.xlsx',
    'date': '01 de August de 2023',
    'time': '14:30 Minutos',
    'ext': '.txt',
    'size': 4502,
    'subject': 'Stay about own.',
    'type': 'Boletim',
    'user': 'Devon Ward',
    'area': 'RH'
  },
  {
    'id': 15,
    'name': 'Especially Star.pdf',
    'date': '10 de August de 2023',
    'time': '14:02 Minutos',
    'ext': '.docx',
    'size': 641,
    'subject': 'Market organization upon.',
    'type': 'Resumo',
    'user': 'Charles Chandler',
    'area': 'RH'
  },
  {
    'id': 16,
    'name': 'Worker Strategy.pptx',
    'date': '29 de October de 2023',
    'time': '04:47 Minutos',
    'ext': '.pdf',
    'size': 3149,
    'subject': 'Positive build six.',
    'type': 'Boletim',
    'user': 'Matthew Lopez',
    'area': 'TI'
  },
  {
    'id': 17,
    'name': 'Partner Effort.xlsx',
    'date': '08 de July de 2024',
    'time': '16:37 Minutos',
    'ext': '.pptx',
    'size': 3195,
    'subject': 'Go service point.',
    'type': 'Relatório',
    'user': 'Christopher Bennett',
    'area': 'R.S.I'
  },
  {
    'id': 18,
    'name': 'Admit Service.pdf',
    'date': '13 de October de 2023',
    'time': '18:36 Minutos',
    'ext': '.xlsx',
    'size': 1761,
    'subject': 'Pm hold.',
    'type': 'Relatório',
    'user': 'Mrs. Barbara Wilkins MD',
    'area': 'RH'
  },
  {
    'id': 19,
    'name': 'Federal Threat.pdf',
    'date': '23 de February de 2024',
    'time': '00:34 Minutos',
    'ext': '.pdf',
    'size': 4996,
    'subject': 'Single rock.',
    'type': 'Artigo',
    'user': 'Rebecca Fernandez',
    'area': 'Financeiro'
  },
  {
    'id': 20,
    'name': 'Station Last.docx',
    'date': '11 de December de 2023',
    'time': '16:03 Minutos',
    'ext': '.pdf',
    'size': 3996,
    'subject': 'Why game.',
    'type': 'Artigo',
    'user': 'Larry Smith',
    'area': 'RH'
  },
  {
    'id': 21,
    'name': 'Able Relate.xlsx',
    'date': '03 de May de 2024',
    'time': '02:03 Minutos',
    'ext': '.docx',
    'size': 4687,
    'subject': 'Lay first.',
    'type': 'Nota',
    'user': 'Tami King',
    'area': 'Financeiro'
  },
  {
    'id': 22,
    'name': 'Movie Bad.xlsx',
    'date': '08 de April de 2024',
    'time': '04:13 Minutos',
    'ext': '.pptx',
    'size': 1145,
    'subject': 'Store gun.',
    'type': 'Resumo',
    'user': 'Brian Rollins',
    'area': 'RH'
  },
  {
    'id': 23,
    'name': 'Nothing Deep.txt',
    'date': '17 de December de 2023',
    'time': '08:38 Minutos',
    'ext': '.pdf',
    'size': 3599,
    'subject': 'Office group.',
    'type': 'Boletim',
    'user': 'Veronica Wagner',
    'area': 'Financeiro'
  },
  {
    'id': 24,
    'name': 'Different Action.pdf',
    'date': '03 de June de 2024',
    'time': '08:31 Minutos',
    'ext': '.xlsx',
    'size': 2509,
    'subject': 'Message us probably.',
    'type': 'Resumo',
    'user': 'Jorge Davis',
    'area': 'TI'
  },
  {
    'id': 25,
    'name': 'Control Quickly.pdf',
    'date': '24 de February de 2024',
    'time': '11:06 Minutos',
    'ext': '.xlsx',
    'size': 3920,
    'subject': 'Network score audience fish.',
    'type': 'Artigo',
    'user': 'Frank Clark',
    'area': 'RH'
  },
  {
    'id': 26,
    'name': 'Line Create.txt',
    'date': '22 de December de 2024',
    'time': '11:18 Minutos',
    'ext': '.pptx',
    'size': 796,
    'subject': 'Middle soon.',
    'type': 'Relatório',
    'user': 'Brittany Ward',
    'area': 'Financeiro'
  },
  {
    'id': 27,
    'name': 'Poor Garden.txt',
    'date': '13 de July de 2023',
    'time': '00:53 Minutos',
    'ext': '.docx',
    'size': 3053,
    'subject': 'Despite behind.',
    'type': 'Nota',
    'user': 'Kristina Lozano',
    'area': 'Financeiro'
  },
  {
    'id': 28,
    'name': 'End Instead.pdf',
    'date': '30 de November de 2024',
    'time': '03:43 Minutos',
    'ext': '.pptx',
    'size': 4324,
    'subject': 'Especially serve price.',
    'type': 'Artigo',
    'user': 'Jamie Gonzalez',
    'area': 'Financeiro'
  },
  {
    'id': 29,
    'name': 'Leave Southern.pdf',
    'date': '16 de April de 2024',
    'time': '19:09 Minutos',
    'ext': '.docx',
    'size': 3385,
    'subject': 'Professional arm.',
    'type': 'Boletim',
    'user': 'Wendy Brown',
    'area': 'Financeiro'
  },
  {
    'id': 30,
    'name': 'Daughter Democrat.pdf',
    'date': '23 de March de 2023',
    'time': '21:52 Minutos',
    'ext': '.xlsx',
    'size': 3395,
    'subject': 'Say despite service.',
    'type': 'Artigo',
    'user': 'Scott Rhodes',
    'area': 'Marketing'
  },
  {
    'id': 31,
    'name': 'Than Next.pdf',
    'date': '08 de March de 2024',
    'time': '11:11 Minutos',
    'ext': '.docx',
    'size': 4642,
    'subject': 'Any area against.',
    'type': 'Artigo',
    'user': 'Thomas Hughes',
    'area': 'R.S.I'
  },
  {
    'id': 32,
    'name': 'Too High.pdf',
    'date': '21 de November de 2023',
    'time': '15:27 Minutos',
    'ext': '.docx',
    'size': 2033,
    'subject': 'Believe political.',
    'type': 'Relatório',
    'user': 'Jeffery King',
    'area': 'RH'
  },
  {
    'id': 33,
    'name': 'Environmental Writer.docx',
    'date': '06 de October de 2023',
    'time': '02:08 Minutos',
    'ext': '.pptx',
    'size': 4320,
    'subject': 'Station one.',
    'type': 'Relatório',
    'user': 'Allison Hood',
    'area': 'R.S.I'
  },
  {
    'id': 34,
    'name': 'Their Manager.docx',
    'date': '12 de November de 2024',
    'time': '03:35 Minutos',
    'ext': '.xlsx',
    'size': 2374,
    'subject': 'Few east house.',
    'type': 'Relatório',
    'user': 'Matthew Marks',
    'area': 'Marketing'
  },
  {
    'id': 35,
    'name': 'Great Within.pdf',
    'date': '16 de November de 2024',
    'time': '19:16 Minutos',
    'ext': '.txt',
    'size': 659,
    'subject': 'Thing respond.',
    'type': 'Relatório',
    'user': 'Terri Robinson',
    'area': 'TI'
  },
  {
    'id': 36,
    'name': 'Statement Help.docx',
    'date': '04 de September de 2024',
    'time': '14:18 Minutos',
    'ext': '.txt',
    'size': 2042,
    'subject': 'Despite believe.',
    'type': 'Relatório',
    'user': 'Mr. George Hamilton',
    'area': 'RH'
  },
  {
    'id': 37,
    'name': 'Paper Consider.pptx',
    'date': '12 de October de 2023',
    'time': '13:59 Minutos',
    'ext': '.pdf',
    'size': 198,
    'subject': 'Card thing.',
    'type': 'Relatório',
    'user': 'Michael Thomas',
    'area': 'Financeiro'
  },
  {
    'id': 38,
    'name': 'For Chair.txt',
    'date': '06 de May de 2023',
    'time': '16:31 Minutos',
    'ext': '.xlsx',
    'size': 3117,
    'subject': 'Difference somebody.',
    'type': 'Relatório',
    'user': 'Kristie Hanson',
    'area': 'Marketing'
  },
  {
    'id': 39,
    'name': 'On Day.pdf',
    'date': '02 de December de 2023',
    'time': '05:50 Minutos',
    'ext': '.pdf',
    'size': 1128,
    'subject': 'Sea return.',
    'type': 'Resumo',
    'user': 'Jordan White',
    'area': 'Marketing'
  },
  {
    'id': 40,
    'name': 'Enough Station.pptx',
    'date': '06 de June de 2024',
    'time': '01:39 Minutos',
    'ext': '.pdf',
    'size': 4295,
    'subject': 'Father subject major.',
    'type': 'Resumo',
    'user': 'Jordan Davis',
    'area': 'Financeiro'
  },
  {
    'id': 41,
    'name': 'Agree Month.xlsx',
    'date': '02 de July de 2023',
    'time': '13:16 Minutos',
    'ext': '.pptx',
    'size': 4804,
    'subject': 'Item task treatment.',
    'type': 'Resumo',
    'user': 'Brandon Henry',
    'area': 'R.S.I'
  },
  {
    'id': 42,
    'name': 'Grow Action.docx',
    'date': '10 de August de 2024',
    'time': '16:44 Minutos',
    'ext': '.xlsx',
    'size': 1722,
    'subject': 'Probably seat operation truth.',
    'type': 'Boletim',
    'user': 'Angela Murphy',
    'area': 'RH'
  },
  {
    'id': 43,
    'name': 'Team Individual.docx',
    'date': '07 de October de 2024',
    'time': '16:09 Minutos',
    'ext': '.docx',
    'size': 3511,
    'subject': 'Trip program him.',
    'type': 'Resumo',
    'user': 'Michael Mason',
    'area': 'Financeiro'
  },
  {
    'id': 44,
    'name': 'Become Step.docx',
    'date': '09 de December de 2023',
    'time': '16:48 Minutos',
    'ext': '.pdf',
    'size': 4605,
    'subject': 'Seek compare energy.',
    'type': 'Resumo',
    'user': 'Emma Reynolds',
    'area': 'R.S.I'
  },
  {
    'id': 45,
    'name': 'Dog Federal.txt',
    'date': '01 de November de 2024',
    'time': '08:27 Minutos',
    'ext': '.pptx',
    'size': 4378,
    'subject': 'Traditional unit.',
    'type': 'Artigo',
    'user': 'Ian Adams',
    'area': 'RH'
  },
  {
    'id': 46,
    'name': 'Account Member.txt',
    'date': '19 de February de 2023',
    'time': '22:37 Minutos',
    'ext': '.xlsx',
    'size': 584,
    'subject': 'Dream site.',
    'type': 'Relatório',
    'user': 'Rhonda King',
    'area': 'TI'
  },
  {
    'id': 47,
    'name': 'Method Teach.txt',
    'date': '30 de June de 2023',
    'time': '04:58 Minutos',
    'ext': '.pdf',
    'size': 168,
    'subject': 'Data.',
    'type': 'Nota',
    'user': 'Mary Williams',
    'area': 'Marketing'
  },
  {
    'id': 48,
    'name': 'Probably Type.pptx',
    'date': '25 de February de 2024',
    'time': '04:01 Minutos',
    'ext': '.pdf',
    'size': 3698,
    'subject': 'Prove program.',
    'type': 'Resumo',
    'user': 'Robin Clements',
    'area': 'TI'
  },
  {
    'id': 49,
    'name': 'Anyone Trade.xlsx',
    'date': '13 de September de 2024',
    'time': '17:01 Minutos',
    'ext': '.xlsx',
    'size': 1080,
    'subject': 'Laugh budget.',
    'type': 'Resumo',
    'user': 'Oscar Khan',
    'area': 'R.S.I'
  },
  {
    'id': 50,
    'name': 'Today Star.txt',
    'date': '14 de September de 2023',
    'time': '10:11 Minutos',
    'ext': '.txt',
    'size': 1369,
    'subject': 'Bring action.',
    'type': 'Resumo',
    'user': 'Trevor Perez',
    'area': 'Marketing'
  },
  {
    'id': 51,
    'name': 'Arrive General.xlsx',
    'date': '17 de July de 2024',
    'time': '10:36 Minutos',
    'ext': '.txt',
    'size': 2848,
    'subject': 'Popular space stuff.',
    'type': 'Relatório',
    'user': 'Katherine Howard',
    'area': 'RH'
  },
  {
    'id': 52,
    'name': 'People Increase.xlsx',
    'date': '22 de February de 2023',
    'time': '10:00 Minutos',
    'ext': '.txt',
    'size': 1449,
    'subject': 'Social benefit.',
    'type': 'Resumo',
    'user': 'Hannah Andrade',
    'area': 'TI'
  },
  {
    'id': 53,
    'name': 'Card Present.pptx',
    'date': '23 de August de 2024',
    'time': '11:35 Minutos',
    'ext': '.pdf',
    'size': 189,
    'subject': 'Friend phone home.',
    'type': 'Resumo',
    'user': 'Janet Baker',
    'area': 'Marketing'
  },
  {
    'id': 54,
    'name': 'Relationship Guess.docx',
    'date': '07 de April de 2023',
    'time': '11:16 Minutos',
    'ext': '.pdf',
    'size': 3371,
    'subject': 'While trouble.',
    'type': 'Relatório',
    'user': 'Lisa Moody',
    'area': 'Marketing'
  },
  {
    'id': 55,
    'name': 'Staff Under.docx',
    'date': '29 de September de 2024',
    'time': '17:59 Minutos',
    'ext': '.txt',
    'size': 2996,
    'subject': 'That owner significant.',
    'type': 'Resumo',
    'user': 'Jonathan Osborne',
    'area': 'Marketing'
  },
  {
    'id': 56,
    'name': 'Seem Radio.pdf',
    'date': '12 de November de 2024',
    'time': '02:51 Minutos',
    'ext': '.pptx',
    'size': 3666,
    'subject': 'Marriage goal concern.',
    'type': 'Resumo',
    'user': 'Kirsten Schmitt',
    'area': 'TI'
  },
  {
    'id': 57,
    'name': 'Cup Talk.txt',
    'date': '21 de July de 2024',
    'time': '18:30 Minutos',
    'ext': '.pptx',
    'size': 1885,
    'subject': 'Through only size shake.',
    'type': 'Relatório',
    'user': 'Mike Jones',
    'area': 'TI'
  },
  {
    'id': 58,
    'name': 'Box Follow.xlsx',
    'date': '27 de October de 2023',
    'time': '21:44 Minutos',
    'ext': '.pptx',
    'size': 4671,
    'subject': 'Decade floor.',
    'type': 'Relatório',
    'user': 'Julia Wood',
    'area': 'TI'
  },
  {
    'id': 59,
    'name': 'That Pretty.xlsx',
    'date': '17 de August de 2023',
    'time': '07:13 Minutos',
    'ext': '.pptx',
    'size': 809,
    'subject': 'Trial majority.',
    'type': 'Resumo',
    'user': 'Robert Roberts',
    'area': 'TI'
  },
  {
    'id': 60,
    'name': 'Ground Detail.xlsx',
    'date': '19 de September de 2023',
    'time': '08:25 Minutos',
    'ext': '.docx',
    'size': 4600,
    'subject': 'Red the positive account.',
    'type': 'Boletim',
    'user': 'Nicole Taylor',
    'area': 'Financeiro'
  }];
}
