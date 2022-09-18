import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djangoReactProject.settings')

import django

django.setup()

from risk.models import Equities

import pandas as pd

df = pd.read_csv('../risk/data/equities.csv')

date_cols = ['start_date', 'end_date', 'delisted_date', 'cumulative_return_update']
for col in date_cols:
    df[col] = pd.to_datetime(df[col], infer_datetime_format=True)

bool_cols = ['ckr_log', 'similar_fund_log', 'is_active']
bool_map = {'f': False, 't': True}
for col in bool_cols:
    df[col] = df[col].map(bool_map)

for idx, date_entry in df.iterrows():
    params = date_entry.to_dict()
    new_equity = Equities(**params)
    new_equity.save()
