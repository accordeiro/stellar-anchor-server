import uuid

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from info.models import Asset


@api_view()
def deposit(request):
    asset_code = request.GET.get("asset_code")
    stellar_account = request.GET.get("account")

    if not all([asset_code, stellar_account]):
        return Response(
            {"error": "asset_code and account are required parameters"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    asset = Asset.objects.filter(name=asset_code).first()
    if not asset or not asset.deposit_enabled:
        return Response(
            {"error": f"invalid operation for asset {asset_code}"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    return Response(
        {
            "type": "interactive_customer_info_needed",
            "url": "llalala",  # TODO: add url
            "id": uuid.uuid4(),
        }
    )

    # TODO: Ensure we can create transactions by providing a UUID id as well


def interactive_deposit(request):
    pass
