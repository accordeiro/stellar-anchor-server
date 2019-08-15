"""
Note (Alex C, 2019-08-15):

This migration has been manually edited to ensure the Transaction
PK update from integer to UUID can also be performed on PostgreSQL

WARNING: this migration is not reversible.
"""
import uuid

from django.db import migrations, models


def fill_transaction_uuid(apps, schema_editor):
    db_alias = schema_editor.connection.alias
    Transaction = apps.get_model("transaction", "Transaction")
    for tx in Transaction.objects.using(db_alias).all():
        tx.uuid = uuid.uuid4()
        tx.save()


class Migration(migrations.Migration):

    dependencies = [("transaction", "0002_auto_20190729_2236")]

    operations = [
        migrations.AddField(
            model_name="transaction",
            name="uuid",
            field=models.UUIDField(default=uuid.uuid4),
        ),
        migrations.RunPython(fill_transaction_uuid, migrations.RunPython.noop),
        migrations.AlterField(
            model_name="transaction",
            name="uuid",
            field=models.UUIDField(default=uuid.uuid4, serialize=False, unique=True),
        ),
        migrations.RemoveField("Transaction", "id"),
        migrations.RenameField(
            model_name="transaction", old_name="uuid", new_name="id"
        ),
        migrations.AlterField(
            model_name="transaction",
            name="id",
            field=models.UUIDField(
                default=uuid.uuid4, primary_key=True, serialize=False
            ),
        ),
        migrations.AlterModelOptions(
            name="transaction", options={"ordering": ("-started_at",)}
        ),
    ]
