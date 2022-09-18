# Generated by Django 4.0.4 on 2022-09-18 21:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('risk', '0002_rename_cuisp_equities_cusip_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='equities',
            name='cik_no',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='equities',
            name='cusip',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='equities',
            name='delisted_date',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='equities',
            name='delisted_reason',
            field=models.CharField(max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='equities',
            name='employees_count',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='equities',
            name='end_date',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='equities',
            name='location',
            field=models.CharField(max_length=40, null=True),
        ),
        migrations.AlterField(
            model_name='equities',
            name='sic_no',
            field=models.IntegerField(null=True),
        ),
    ]
