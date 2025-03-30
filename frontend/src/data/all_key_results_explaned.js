export const mockKeyResultsExplaned = [
  {
    "objectiveId": "MW-O-897",
    "keyResultId": "MW-KR-898",
    "measurement": {
      "descricao": "Disponibilidade dos serviços críticos monitorada pelo Datadog.",
      "formula": "Uptime (%) = (Total disp. − Downtime) / Total disp. × 100"
    },
    "fonte_da_informacao": "Datadog",
    "frequencia_de_atualizacao": "Semanal"
  },
  {
    "objectiveId": "MW-O-897",
    "keyResultId": "MW-KR-899",
    "measurement": {
      "descricao": "Percentual de incidentes resolvidos em 80h.",
      "formula": "(Incidentes resolvidos ≤ 80h / Total incidentes) × 100"
    },
    "fonte_da_informacao": "Jira Service Desk",
    "frequencia_de_atualizacao": "Semanal"
  },
  {
    "objectiveId": "MW-O-897",
    "keyResultId": "MW-KR-900",
    "measurement": {
      "descricao": "Tempo resposta API medido pelo Datadog.",
      "formula": "(Req. ≤ 500ms / Total Req.) × 100"
    },
    "fonte_da_informacao": "APM Datadog",
    "frequencia_de_atualizacao": "Semanal"
  },
  {
    "objectiveId": "MW-O-897",
    "keyResultId": "MW-KR-965",
    "measurement": {
      "descricao": "1ª resposta incidente Jira.",
      "formula": "(Incidentes com 1ª resposta ≤ 8h / Total incidentes) × 100"
    },
    "fonte_da_informacao": "Jira Service Desk",
    "frequencia_de_atualizacao": "Semanal"
  },
  {
    "objectiveId": "MW-O-884",
    "keyResultId": "MW-KR-885",
    "measurement": {
      "descricao": "Total custos AWS, Google, Vercer, ElasticSearch, Cloudflare ÷ MAU.",
      "formula": "TOTAL CUSTOS / MAU"
    },
    "fonte_da_informacao": "Dashboards de billing (AWS, Google, etc.)",
    "frequencia_de_atualizacao": "Mensal"
  },
  {
    "objectiveId": "MW-O-884",
    "keyResultId": "MW-KR-886",
    "measurement": {
      "descricao": "AWS contas Education, Experts, Marketing + Metabase + DataLake.",
      "formula": "Soma custos descritos"
    },
    "fonte_da_informacao": "AWS Cost Explorer",
    "frequencia_de_atualizacao": "Mensal"
  },
  {
    "objectiveId": "MW-O-884",
    "keyResultId": "MW-KR-887",
    "measurement": {
      "descricao": "Soma AWS Sandbox, infra-sandbox, Stage.",
      "formula": "Custos AWS descritos somados"
    },
    "fonte_da_informacao": "AWS Cost Explorer",
    "frequencia_de_atualizacao": "Mensal"
  },
  {
    "objectiveId": "MW-O-884",
    "keyResultId": "MW-KR-888",
    "measurement": {
      "descricao": "Soma mensal Azure + OpenAI API + Tavily API.",
      "formula": "Soma custos Azure e APIs"
    },
    "fonte_da_informacao": "Dashboards Azure/OpenAI/Tavily",
    "frequencia_de_atualizacao": "Mensal"
  },
  {
    "objectiveId": "MW-O-956",
    "keyResultId": "MW-KR-957",
    "measurement": {
      "descricao": "Atividades backlog camadas bronze/silver/gold.",
      "formula": "(Atividades implementadas / backlog total) × 100"
    },
    "fonte_da_informacao": "Timeline Jira Data Lake",
    "frequencia_de_atualizacao": "Mensal"
  },
  {
    "objectiveId": "MW-O-956",
    "keyResultId": "MW-KR-958",
    "measurement": {
      "descricao": "Solicitações extração/relatório no prazo.",
      "formula": "(Entregas prazo / Total planejadas) × 100"
    },
    "fonte_da_informacao": "Jira (tag delay-delivery)",
    "frequencia_de_atualizacao": "Semanal"
  },
  {
    "objectiveId": "MW-O-892",
    "keyResultId": "MW-KR-893",
    "measurement": {
      "como_e_mensurado_calculado": [
        "Total US: Soma todas as user stories planejadas e formalizadas no início de cada sprint.",
        "Total US Não Entregue: Soma todas as user stories planejadas e formalizadas no início da sprint que não atenderam aos critérios de aceite dentro do prazo ou que não foram entregues dentro do prazo estabelecido."
      ],
      "formula": "% US Não Entregues = (Total US Não Entregue / Total US) * 100\n% US Entregues no prazo = 100% – (% US Não Entregues)"
    },
    "fonte_da_informacao": "Jira (User Stories serão marcadas com 'delay-delivery')",
    "frequencia_de_atualizacao": "Semanal"
  },
  {
    "objectiveId": "MW-O-892",
    "keyResultId": "MW-KR-894",
    "measurement": {
      "como_e_mensurado_calculado": [
        "Total US: Soma todas as user stories planejadas e formalizadas no início da sprint e também as absorvidas após seu início.",
        "Total US com alteração de escopo: Soma todas as user stories com aumento não planejado ou incluídas após o início."
      ],
      "formula": "% US com alteração de escopo = (Total US com alteração de escopo / Total US) * 100\n% US sem alteração de escopo = 100% – (% US com alteração de escopo)"
    },
    "fonte_da_informacao": "Jira (user stories com 'scope-change')",
    "frequencia_de_atualizacao": "Semanal"
  },
  {
    "objectiveId": "MW-O-892",
    "keyResultId": "MW-KR-895",
    "measurement": {
      "como_e_mensurado_calculado": [
        "Total US: Soma de todas as user stories entregues.",
        "Total de US com bugs: Soma das user stories com bugs em até 15 dias após a implantação."
      ],
      "formula": "% US com bugs = (Total de US com bugs / Total US) * 100\n% US sem bugs = 100% – (% US com bugs)"
    },
    "fonte_da_informacao": "Jira (user stories com label 'bug-after-deploy')",
    "frequencia_de_atualizacao": "Semanal"
  },
  {
    "objectiveId": "MW-O-892",
    "keyResultId": "MW-KR-896",
    "measurement": {
      "como_e_mensurado_calculado": [
        "Garantir entrega mensal de relatórios de testes de performance nas funcionalidades: Cadastro, Login, Matrícula, Checkout, Acesso a conteúdos, Conclusão de curso, Geração de certificado."
      ]
    },
    "fonte_da_informacao": "Relatório mensal enviado por e-mail após realização do teste",
    "frequencia_de_atualizacao": "Mensal"
  }
]