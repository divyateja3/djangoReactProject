import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djangoReactProject.settings')

import django

django.setup()

from risk.models import Equities, Returns

import pandas as pd

df = pd.read_csv('../risk/data/returns.csv')

df['date'] = pd.to_datetime(df['date'], infer_datetime_format=True)

for idx, date_entry in df.iterrows():
    params = date_entry.to_dict()
    params['equity_id'] = Equities.objects.get(pk=params['equity_id'])
    new_return = Returns(**params)
    new_return.save()
